import { ReactElement, createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/auth';

interface AuthProviderProps {
  children: ReactElement | null;
}

interface UserAuth {
  token: string;
  login: (data: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UserAuth>({
  token: '',
  login: (data: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: string) => {
    setToken(data);
    navigate('/');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    navigate('/login', { replace: true });
  };

  const value = useMemo<UserAuth>(
    () => ({
      token,
      login,
      logout,
    }),
    [token],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
