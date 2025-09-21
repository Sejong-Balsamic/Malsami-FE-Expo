import { colors } from "@/constants/colors";
import { useAuth } from "@/hooks";
import { Button, SafeAreaView, StyleSheet, Text } from "react-native";

export default function MypageHomeScreen() {
  const { auth, handleLogout } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Mypage Redirecting</Text>
      {auth.memberId && <Button title="로그아웃" onPress={handleLogout} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
});
