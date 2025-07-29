import useAuth from "@/hooks/queries/useAuth";
import useModal from "@/hooks/useModal";
import { router, useFocusEffect } from "expo-router";
import React, { Children, ReactNode } from "react";
import { StyleSheet } from "react-native";
import AuthRouteModal from "./AuthRouteModal";

interface AuthRouteProps {
  children: ReactNode;
}

function AuthRoute({ children }: AuthRouteProps) {
  const { auth } = useAuth();
  const authRouteModal = useModal();

  useFocusEffect(() => {
    // !auth.id && router.replace("/auth");
    !auth.id && authRouteModal.show();
  });
  return (
    <>
      {children}
      {authRouteModal.isVisible && (
        <AuthRouteModal
          onPress={() => {
            router.replace("/auth");
            authRouteModal.hide();
          }}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default AuthRoute;
