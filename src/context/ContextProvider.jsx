import useAuth from '../hooks/useAuth';
import { AuthContext } from './authContext';

const ContextProvider = ({children}) => {
    const allContextData = useAuth()
    return (
        <AuthContext value={allContextData}>
            {children}
        </AuthContext>
    );
};

export default ContextProvider;