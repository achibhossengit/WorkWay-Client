import { useEffect, useState } from "react";
import apiClient from "../services/ApiClient";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper Functions
  const getTokensFromLocalStorage = () => {
    const storedTokens = localStorage.getItem("authTokens");
    return storedTokens ? JSON.parse(storedTokens) : null;
  };

  const [tokens, setTokens] = useState(getTokensFromLocalStorage());

  const setTokensInLocalStorage = (tokens) => {
    localStorage.setItem("authTokens", JSON.stringify(tokens));
    setTokens(tokens);
  };

  const removeTokensFromLocalStorage = () => {
    localStorage.removeItem("authTokens");
    setTokens(null);
  };

  // Fetch user data using access token
  const fetchUser = async (accessToken = tokens?.access) => {
    setLoading(true);
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.get("auth/users/me", {
        headers: { Authorization: `JWT ${accessToken}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("User fetch failed:", error);
      if (error.response?.status === 401) {
        logout(); // Auto logout if token is invalid
      }
    } finally {
      setLoading(false);
    }
  };

  // Login and store tokens
  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await apiClient.post("auth/jwt/create", credentials);
      const { access, refresh } = res.data;

      // Store tokens and fetch user data
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

  // Logout and clear all auth data
  const logout = () => {
    removeTokensFromLocalStorage();
    setUser(null);
  };

  // Check user on initial load
  useEffect(() => {
    fetchUser();
  }, [tokens]);

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
