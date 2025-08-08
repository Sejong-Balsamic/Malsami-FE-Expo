import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text>Home Redirecting</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
