import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import {
  getOfflineModePreference,
  isConnectionOffline,
  setOfflineModePreference,
} from "../api/offline";

const USER_STORAGE_KEY = "loggedInUser";

export const AppContext = createContext({
  user: null,
  saveUser: () => {},
  logout: () => {},
  offlineMode: false,
  isConnectionOffline: false,
  isOfflineActive: false,
  setOfflineMode: () => {},
});

const readStoredUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(USER_STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    return null;
  }
};

export function AppProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);
  const [offlineMode, setOfflineModeState] = useState(getOfflineModePreference);
  const [connectionOffline, setConnectionOffline] = useState(isConnectionOffline);

  const saveUser = useCallback(async (nextUser) => {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const setOfflineMode = useCallback((enabled) => {
    setOfflineModePreference(enabled);
    setOfflineModeState(Boolean(enabled));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const updateConnectionState = () => {
      setConnectionOffline(isConnectionOffline());
    };

    updateConnectionState();
    window.addEventListener("online", updateConnectionState);
    window.addEventListener("offline", updateConnectionState);
    setOfflineModePreference(offlineMode);

    return () => {
      window.removeEventListener("online", updateConnectionState);
      window.removeEventListener("offline", updateConnectionState);
    };
  }, [offlineMode]);

  const value = useMemo(
    () => ({
      user,
      saveUser,
      logout,
      isLoggedIn: Boolean(user),
      offlineMode,
      isConnectionOffline: connectionOffline,
      isOfflineActive: offlineMode || connectionOffline,
      setOfflineMode,
    }),
    [connectionOffline, logout, offlineMode, saveUser, setOfflineMode, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
