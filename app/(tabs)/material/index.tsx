import SearchModalBox from "@/components/screen/tab/SearchModalBox";
import { colors } from "@/constants";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function MaterialHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        필요한 자료를{" "}
        <Text style={{ color: colors.PRIMARY_DOCUMENT_COLOR }}>구매</Text>
        하고,{`\n`}여러 자료를{" "}
        <Text style={{ color: colors.PRIMARY_DOCUMENT_COLOR }}>
          직접 올려보세요!
        </Text>
      </Text>
      <View style={styles.searchContainer}>
        <SearchModalBox type="document" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  headerText: {
    paddingHorizontal: 20,
    lineHeight: 28,
    marginTop: 40,
    fontSize: 20,
    fontWeight: "500",
    color: colors.UNCHANGED_BLACK,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
});
