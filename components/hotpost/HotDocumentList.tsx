import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import ListFeedItem from "./ListFeedItem";
import { router } from "expo-router";

type TabType = "daily" | "weekly";

interface HotDocumentListProps {
  type: TabType;
}

export default function HotDocumentList({ type }: HotDocumentListProps) {
  const dailyQuery = useGetDailyDocuments();
  const weeklyQuery = useGetWeeklyDocuments();

  const { data, isLoading, error } =
    type === "daily" ? dailyQuery : weeklyQuery;
  const documents = data?.documentPostsPage?.content;

  const handleItemPress = (id: string) => {
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
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
