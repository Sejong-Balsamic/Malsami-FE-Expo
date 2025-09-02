import React, { useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useDocumentPostStore } from "@/store/documentPostStore";
import FeedItem from "@/components/FeedItem";
import FeedListHeader from "./FeedListHeader";
import { LoadingState, ErrorState, EmptyState } from "./FeedListStates";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";

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

  const renderItem = ({ item }: { item: DocumentPost }) => {
    return (
      <FeedItem type="document" documentPost={item} onPress={onPressItem} />
    );
  };

  // Loading state
  if (isLoading && !documents) {
    return (
      <LoadingState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
      />
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
      />
    );
  }

  // Empty state
  if (!documents || documents.length === 0) {
    return (
      <EmptyState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
      />
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerWithTabContainer: {
    marginBottom: 12,
  },
  listContent: {
    paddingVertical: 4,
  },
});
