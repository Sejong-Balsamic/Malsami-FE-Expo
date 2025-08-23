import CustomButton from "@/components/CustomButton";
import GradientText from "@/components/GradientText";
import InputField from "@/components/InputField";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { signinMutation } = useAuth();
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signinMutation.isSuccess) {
      const timer = setTimeout(() => {
        router.replace("/");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [signinMutation.isSuccess]);

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

  if (signinMutation.isPending) {
    return (
      <View style={styles.processingContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <Text style={styles.processingText}>로그인 중이에요!</Text>
        <Text style={styles.processingSubText}>잠시만 기다려주세요 :)</Text>
      </View>
    );
  }

  if (signinMutation.isSuccess) {
    return (
      <View style={styles.processingContainer}>
        <LinearGradient
          colors={colors.PRIMARY_GRADIENT}
          style={styles.iconContainer}
        >
          <Feather name="check" size={40} color={"#fff"} />
        </LinearGradient>
        <Text style={styles.processingText}>로그인 완료!</Text>
      </View>
    );
  }

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
        <CustomButton
          buttonText={"로그인"}
          onPress={handleLogin}
          disabled={signinMutation.isPending}
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
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
  },
  processingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.GRAY_500,
  },
  processingSubText: {
    fontSize: 16,
    color: colors.GRAY_400,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
