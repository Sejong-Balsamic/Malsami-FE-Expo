import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useGetNoticePosts } from "@/hooks/queries/useGetNoticePosts";
import FeedItem from "@/components/FeedItem";
import { LoadingState, ErrorState, EmptyState } from "./FeedListStates";
import { NoticePost } from "@/types/entities/postgres/noticePost";

interface NoticeFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

export default function NoticeFeedList({
  title = "공지사항",
  onPressViewAll,
  onPressItem,
}: NoticeFeedListProps) {
  const { data: noticePostsData, isLoading, error } = useGetNoticePosts();

  // 디버깅을 위한 로그
  console.log("NoticeFeedList - noticePostsData:", noticePostsData);
  console.log("NoticeFeedList - isLoading:", isLoading);
  console.log("NoticeFeedList - error:", error);

  const renderItem = ({ item }: { item: NoticePost }) => {
    return <FeedItem type="notice" noticePost={item} onPress={onPressItem} />;
  };

  // Loading state
  if (isLoading && !noticePostsData) {
    return (
      <View style={styles.container}>
        <NoticeHeader title={title} onPressViewAll={onPressViewAll} />
        <LoadingState
          title={title}
          activeTab="daily"
          onTabChange={() => {}}
          onPressViewAll={onPressViewAll}
        />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <NoticeHeader title={title} onPressViewAll={onPressViewAll} />
        <ErrorState
          title={title}
          activeTab="daily"
          onTabChange={() => {}}
          onPressViewAll={onPressViewAll}
          message="공지사항을 불러오는 중 오류가 발생했습니다."
        />
      </View>
    );
  }

  // Extract notice posts from the response
  const noticePosts = noticePostsData?.noticePostsPage?.content || [];

  // Empty state
  if (noticePosts.length === 0) {
    return (
      <View style={styles.container}>
        <NoticeHeader title={title} onPressViewAll={onPressViewAll} />
        <EmptyState
          title={title}
          activeTab="daily"
          onTabChange={() => {}}
          onPressViewAll={onPressViewAll}
          message="공지사항이 없습니다."
        />
      </View>
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <NoticeHeader title={title} onPressViewAll={onPressViewAll} />
      <FlatList
        data={noticePosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.noticePostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function NoticeHeader({
  title,
  onPressViewAll,
}: {
  title: string;
  onPressViewAll?: () => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>전체보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  listContent: {
    paddingVertical: 4,
  },
});
