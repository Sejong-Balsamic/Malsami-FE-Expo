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
    //멤버 아이디가 없을 시 모달 호출 및 모달을 통한 로그인 페이지 이동
    !auth.memberId && authRouteModal.show();
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
