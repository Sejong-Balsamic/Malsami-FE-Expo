import {
  // useGetInfiniteDailyDocuments,
  // useGetInfiniteWeeklyDocuments,
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import PagerView from "react-native-pager-view";
import ListFeedItem from "@/components/hotpost/ListFeedItem";
import { router } from "expo-router";
import { colors } from "@/constants";

type TabType = "daily" | "weekly";

export default function HotDocumentListScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("daily");
  const pagerRef = useRef<PagerView>(null);

  const handleTabPress = (tab: TabType, pageIndex: number) => {
    setActiveTab(tab);
    pagerRef.current?.setPage(pageIndex);
  };

  return (
    <View style={styles.container}>
      <TabSelector activeTab={activeTab} onTabPress={handleTabPress} />
      <PagerView
        ref={pagerRef}
        style={styles.pagerView}
        initialPage={0}
        onPageSelected={(e) => {
          setActiveTab(e.nativeEvent.position === 0 ? "daily" : "weekly");
        }}
      >
        <View key="1">
          <DocumentList type="daily" />
        </View>
        <View key="2">
          <DocumentList type="weekly" />
        </View>
      </PagerView>
    </View>
  );
}

const TabSelector = ({
  activeTab,
  onTabPress,
}: {
  activeTab: TabType;
  onTabPress: (tab: TabType, index: number) => void;
}) => (
  <View style={styles.tabContainer}>
    <TouchableOpacity
      style={[styles.tabItem, activeTab === "daily" && styles.activeTabItem]}
      onPress={() => onTabPress("daily", 0)}
    >
      <Text
        style={[styles.tabText, activeTab === "daily" && styles.activeTabText]}
      >
        일간
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tabItem, activeTab === "weekly" && styles.activeTabItem]}
      onPress={() => onTabPress("weekly", 1)}
    >
      <Text
        style={[styles.tabText, activeTab === "weekly" && styles.activeTabText]}
      >
        주간
      </Text>
    </TouchableOpacity>
  </View>
);

const DocumentList = ({ type }: { type: TabType }) => {
  const dailyQuery = useGetDailyDocuments();
  const weeklyQuery = useGetWeeklyDocuments();

  const { data, isLoading, error } =
    type === "daily" ? dailyQuery : weeklyQuery;

  const documents = data?.documentPostsPage?.content;

  const handleItemPress = (id: string) => {
    // Note: This route might not exist yet.
    router.push(`/hotpost/${id}`);
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>오류가 발생했습니다.</Text>
      </View>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text>게시물이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={documents}
      renderItem={({ item }) => (
        <ListFeedItem documentPost={item} onPress={handleItemPress} />
      )}
      keyExtractor={(item) => item.documentPostId || String(Math.random())}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomColor: colors.GRAY_100,
    paddingHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY_COLOR,
  },
  tabText: {
    fontSize: 16,
    color: colors.GRAY_500,
  },
  activeTabText: {
    fontWeight: "bold",
    color: colors.PRIMARY_COLOR,
  },
  pagerView: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
