import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function MypageHomeScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>Mypage Redirecting</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({});
