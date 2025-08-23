import useModal from "@/hooks/useModal";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthModalContextType {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const { isVisible, show, hide } = useModal();

  return (
    <AuthModalContext.Provider value={{ isVisible, show, hide }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};
