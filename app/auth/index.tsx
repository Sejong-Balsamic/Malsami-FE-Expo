import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import useAuth from "@/hooks/queries/useAuth";
import LoginForm from "@/components/auth/LoginForm";
import {
  LoginLoadingState,
  LoginSuccessState,
} from "@/components/auth/LoginStates";

export default function AuthScreen() {
  const { signinMutation } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessState, setShowSuccessState] = useState(false);

  useEffect(() => {
    console.log(
      "🔍 Auth useEffect - isSuccess:",
      signinMutation.isSuccess,
      "showSuccessState:",
      showSuccessState
    );

    if (signinMutation.isSuccess && !showSuccessState) {
      console.log("✅ 로그인 성공! 성공 상태 표시 시작");
      // 성공 상태를 보여주기 위해 상태 변경
      setShowSuccessState(true);
    }
  }, [signinMutation.isSuccess, showSuccessState]);

  // 애니메이션 완료 후 라우팅 처리
  const handleAnimationComplete = () => {
    console.log("🚀 애니메이션 완료 후 메인 화면으로 이동 중...");
    router.replace("/");
  };

  const handleLogin = () => {
    if (!studentId || !password) {
      Alert.alert("입력 오류", "학번과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("sejongPortalId", studentId);
    formData.append("sejongPortalPassword", password);

    signinMutation.mutate(formData, {
      onError: () => {
        Alert.alert("로그인 실패", "학번 또는 비밀번호를 다시 확인해주세요.");
      },
    });
  };

  // Loading state
  if (signinMutation.isPending) {
    return <LoginLoadingState />;
  }

  // Success state - showSuccessState가 true일 때만 표시
  if (showSuccessState) {
    return <LoginSuccessState onAnimationComplete={handleAnimationComplete} />;
  }

  return (
    <LoginForm
      studentId={studentId}
      password={password}
      onStudentIdChange={setStudentId}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
      isLoading={signinMutation.isPending}
    />
  );
}
