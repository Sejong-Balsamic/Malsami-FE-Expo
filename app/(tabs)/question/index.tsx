import AuthRoute from "@/components/AuthRoute";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function QuestionHomeScreen() {
  return (
    <AuthRoute>
      <SafeAreaView>
        <Text>Question Redirecting</Text>
      </SafeAreaView>
    </AuthRoute>
  );
}

const styles = StyleSheet.create({});
