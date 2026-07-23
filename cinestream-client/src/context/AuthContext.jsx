import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { backend } from "../api/backend";
import { storage } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(storage.getToken());
  const [user, setUser] = useState(storage.getUser());
  const [loading, setLoading] = useState(Boolean(token));

  useEffect(() => {
    if (!token) { setLoading(false); return; }
    backend.profile(token).then(({ user: current }) => {
      setUser(current); storage.setUser(current);
    }).catch(() => {
      storage.clearAuth(); setToken(null); setUser(null);
    }).finally(() => setLoading(false));
  }, [token]);

  const login = async (credentials) => {
    const data = await backend.login(credentials);
    storage.setToken(data.token); storage.setUser(data.user);
    setToken(data.token); setUser(data.user);
    return data;
  };
  const register = async (payload) => {
    const data = await backend.register(payload);
    if (data.token) {
      storage.setToken(data.token); storage.setUser(data.user); setToken(data.token); setUser(data.user);
      return data;
    }
    return login({ email: payload.email, password: payload.password });
  };
  const logout = () => { storage.clearAuth(); setToken(null); setUser(null); };
  const refreshUser = async () => {
    const data = await backend.profile(token); setUser(data.user); storage.setUser(data.user); return data.user;
  };
  const updateUser = (next) => { setUser(next); storage.setUser(next); };

  const value = useMemo(() => ({ token, user, loading, isAuthenticated: Boolean(token), login, register, logout, refreshUser, updateUser }), [token, user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
