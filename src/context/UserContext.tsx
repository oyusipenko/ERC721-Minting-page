"use client";

import { createContext, useContext, useState, useMemo } from "react";

type AuthUser = {
  address?: string;
  chainId?: number;
} | null;

type UserContextType = {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);

  // Запомнить значение контекста, чтобы не пересоздавать объект
  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/** Хук для удобного доступа к контексту */
export function useUser() {
  return useContext(UserContext);
}
