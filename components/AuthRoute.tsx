import useAuth from "@/hooks/queries/useAuth";
import useModal from "@/hooks/useModal";
import { router, useFocusEffect } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import AuthRouteModal from "./AuthRouteModal";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();
  const authRouteModal = useModal();

  useFocusEffect(() => {
    !auth.memberId && authRouteModal.show();
  });
  return (
    <>
      {children}
      {authRouteModal.isVisible && (
        <AuthRouteModal
          hide={authRouteModal.hide}
          onPress={() => {
            router.replace("/auth");
            authRouteModal.hide();
          }}
        />
      )}
    </>
  );
}

export default AuthRoute;
