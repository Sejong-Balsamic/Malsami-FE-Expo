import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDocumentPostStore } from "@/store/documentPostStore";
import FeedItem from "@/components/FeedItem";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import { colors } from "@/constants";

interface HotDocumentFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

export default function HotDocumentFeedList({
  title = "HOT 인기자료",
  onPressViewAll,
  onPressItem,
}: HotDocumentFeedListProps) {
  const { dailyDocuments, weeklyDocuments, activeTab, setActiveTab } =
    useDocumentPostStore();

  const dailyQuery = useGetDailyDocuments();
  const weeklyQuery = useGetWeeklyDocuments();

  const documents = activeTab === "daily" ? dailyDocuments : weeklyDocuments;
  const isLoading =
    activeTab === "daily" ? dailyQuery.isLoading : weeklyQuery.isLoading;
  const error = activeTab === "daily" ? dailyQuery.error : weeklyQuery.error;

  const handleTabChange = useCallback(
    (tab: "daily" | "weekly") => {
      setActiveTab(tab);
    },
    [setActiveTab]
  );

  if (isLoading && !documents) {
    return (
      <View style={styles.container}>
        <HeaderSection
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <HeaderSection
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            인기자료를 불러오는 중 오류가 발생했습니다.
          </Text>
        </View>
      </View>
    );
  }

  if (!documents || documents.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderSection
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {activeTab === "daily" ? "일간 " : "주간 "}인기 자료가 없습니다.
          </Text>
        </View>
      </View>
    );
  }

  const renderItem = ({ item }: { item: DocumentPost }) => {
    return (
      <FeedItem type="document" documentPost={item} onPress={onPressItem} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <HeaderSection
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.documentPostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function HeaderSection({
  title,
  onPressViewAll,
  activeTab,
  onTabChange,
}: {
  title: string;
  onPressViewAll?: () => void;
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.hotIcon}>🔥</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TabButtons activeTab={activeTab} onTabChange={onTabChange} />
      {onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>전체보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function TabButtons({
  activeTab,
  onTabChange,
}: {
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "daily" && styles.activeTab]}
        onPress={() => onTabChange("daily")}
      >
        <Text
          style={activeTab === "daily" ? styles.activeTabText : styles.tabText}
        >
          일간
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "weekly" && styles.activeTab]}
        onPress={() => onTabChange("weekly")}
      >
        <Text
          style={activeTab === "weekly" ? styles.activeTabText : styles.tabText}
        >
          주간
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerWithTabContainer: {
    marginBottom: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hotIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  tabButton: {
    backgroundColor: colors.TAB_BACKGROUND,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 12,
    color: colors.TAB_TEXT,
  },
  activeTab: {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
  },
  listContent: {
    paddingVertical: 4,
  },
  loadingContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
});
