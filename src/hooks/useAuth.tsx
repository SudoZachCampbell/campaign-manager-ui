import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../utils/auth';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'jsonwebtoken';

interface AuthProviderProps {
  children: ReactElement | null;
}

interface UserAuth {
  token: string;
  payload: JwtPayload;
  login: (data: string) => void;
  logout: () => void;
}

const AuthContext = createContext<UserAuth>({
  token: '',
  payload: {},
  login: (data: string) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [payload, setPayload] = useLocalStorage('payload', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data: string) => {
    setToken(data);
    setPayload(jwtDecode<JwtPayload>(data));
    navigate('/');
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    setPayload(null);
    navigate('/login', { replace: true });
  };

  console.log(`useAuth.tsx:51 token`, token);
  console.log(`useAuth.tsx:51 payload`, payload);

  const value = useMemo<UserAuth>(
    () => ({
      token,
      payload,
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
