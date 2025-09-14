import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomButton from "@/components/common/CustomButton";
import GradientText from "@/components/common/GradientText";
import { colors } from "@/constants";
import CustomInput from "../common/CustomInput";

interface LoginFormProps {
  studentId: string;
  password: string;
  onStudentIdChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onLogin: () => void;
  isLoading: boolean;
}

export default function LoginForm({
  studentId,
  password,
  onStudentIdChange,
  onPasswordChange,
  onLogin,
  isLoading,
}: LoginFormProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <GradientText
          text1="환영합니다!  "
          linearText="세종말싸미"
          text2="입니다."
        />
        <Text style={[styles.headerSubText, { marginTop: 16 }]}>
          <Text style={[{ color: colors.GRAY_500, fontSize: 14 }]}>
            세종대학교 포털
          </Text>
          의 학번과 비밀번호로 로그인해주세요.
        </Text>
        <Text style={[styles.headerSubText, { marginBottom: 60 }]}>
          비밀번호는 서버에 저장되지 않아요!
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <CustomInput
          label="학번"
          type="login"
          value={studentId}
          onChangeText={onStudentIdChange}
          showClearButton
        />
        <CustomInput
          label="비밀번호"
          type="login"
          value={password}
          onChangeText={onPasswordChange}
          setSecureTextEntry={true}
          showClearButton
          showPasswordToggle
        />
      </View>

      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
        <CustomButton
          buttonText={"로그인"}
          onPress={onLogin}
          disabled={isLoading}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    paddingTop: 42,
    paddingHorizontal: 20,
  },
  headerSubText: {
    fontSize: 14,
    color: colors.GRAY_200,
  },
  inputContainer: {
    paddingHorizontal: 20,
    gap: 28,
  },
  buttonContainer: {
    position: "absolute",
    paddingHorizontal: 20,
    bottom: 60,
    left: 0,
    right: 0,
  },
});
