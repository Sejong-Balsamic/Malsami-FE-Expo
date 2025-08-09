import CustomButton from "@/components/CustomButton";
import WelcomeSection from "@/components/home/WelcomeSection";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const { auth } = useAuth();
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <WelcomeSection
        authData={auth}
        onPressLogin={() => router.replace("/auth")}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {},
  searchHeaderContainer: {
    flexDirection: "row",
    zIndex: 10,
    alignItems: "center",
    gap: 8,
  },
  searchHeaderImage: {
    width: 120,
    height: 180,
  },
  searchHeaderInputContainer: {
    marginTop: -40,
    zIndex: 10,
  },
});
