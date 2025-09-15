import SearchModalBox from "@/components/screen/tab/SearchModalBox";
import { colors } from "@/constants";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

export default function QuestionHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>
        궁금한 내용을{" "}
        <Text style={{ color: colors.PRIMARY_QUESTION_COLOR }}>질문</Text>
        하고,{`\n`}다른 사람의 질문에{" "}
        <Text style={{ color: colors.PRIMARY_QUESTION_COLOR }}>답변</Text>해
        주세요!
      </Text>
      <View style={styles.searchContainer}>
        <SearchModalBox type="question" onPress={() => {}} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
