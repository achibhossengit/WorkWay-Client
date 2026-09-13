import { useCallback, useEffect, useState } from "react";
import apiClient, { setUnauthorizedHandler } from "../services/ApiClient";

const getTokensFromLocalStorage = () => {
  const storedTokens = localStorage.getItem("authTokens");
  return storedTokens ? JSON.parse(storedTokens) : null;
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokens, setTokens] = useState(getTokensFromLocalStorage);

  const setTokensInLocalStorage = useCallback((newTokens) => {
    localStorage.setItem("authTokens", JSON.stringify(newTokens));
    setTokens(newTokens);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("authTokens");
    setTokens(null);
    setUser(null);
  }, []);

  const fetchUser = useCallback(async (accessToken) => {
    const token = accessToken ?? tokens?.access;
    setLoading(true);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.get("auth/users/me");
      setUser(res.data);
    } catch (error) {
      console.error("User fetch failed:", error);
    } finally {
      setLoading(false);
    }
  }, [tokens?.access]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await apiClient.post("auth/jwt/create", credentials);
      const { access, refresh } = res.data;

      const newTokens = { access, refresh };
      setTokensInLocalStorage(newTokens);

      const userData = await fetchUser(access);
      return { success: true, user: userData };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setUnauthorizedHandler(logout);
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    loading,
    tokens,
    login,
    logout,
    fetchUser,
  };
};

export default useAuth;
