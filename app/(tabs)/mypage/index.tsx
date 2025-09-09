import { useAuth } from "@/hooks";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";

export default function MypageHomeScreen() {
  const { auth, handleLogout } = useAuth();
  return (
    <SafeAreaView>
      {auth.memberId && <Button title="로그아웃" onPress={handleLogout} />}
      <Text>Mypage Redirecting</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
