import React, { createContext, useCallback, useMemo, useState } from "react";

const USER_STORAGE_KEY = "loggedInUser";

export const AppContext = createContext({
  user: null,
  saveUser: () => {},
  logout: () => {},
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

  const saveUser = useCallback(async (nextUser) => {
    window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      saveUser,
      logout,
      isLoggedIn: Boolean(user),
    }),
    [logout, saveUser, user],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
