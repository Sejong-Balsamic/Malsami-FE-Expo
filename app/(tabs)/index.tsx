import InputField from "@/components/InputField";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Character from "@/components/Character";

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchHeaderContainer}>
          <Character />
          <Text>반가워요, 강주현님!{`\n`}궁금한 자료를 검색해보세요!</Text>
        </View>
        <View style={styles.searchHeaderInputContainer}>
          <InputField
            placeHolderValue="검색할 것을 입력"
            leftChild={<EvilIcons name="search" />}
            type="search"
          />
        </View>
      </View>
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
