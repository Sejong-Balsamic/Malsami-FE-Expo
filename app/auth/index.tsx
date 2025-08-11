import CustomButton from "@/components/CustomButton";
import GradientText from "@/components/GradientText";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { signinMutation } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("로그인");
    const formData = new FormData();
    formData.append("sejongPortalId", studentId);
    formData.append("sejongPortalPassword", password);
    signinMutation.mutate(formData, {
      onSuccess: () => {
        console.log("로그인 성공");
      },
      onError: () => {
        console.log("로그인 실패");
      },
    });
  };

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
        <InputField
          placeholderText="학번"
          label="학번"
          type="login"
          value={studentId}
          onChangeText={(text) => setStudentId(text)}
        />
        <InputField
          placeholderText="비밀번호"
          label="비밀번호"
          type="login"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.buttonContainer, { paddingBottom: insets.bottom }]}>
        <CustomButton buttonText={"로그인"} onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
