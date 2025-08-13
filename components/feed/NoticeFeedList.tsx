import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNoticePostStore } from "@/store/noticePostStore";
import FeedItem from "@/components/FeedItem";
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
  const { noticePostsPage, isLoading, error } = useNoticePostStore();

  // 로딩 중일 때
  if (isLoading && !noticePostsPage) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            공지사항을 불러오는 중 오류가 발생했습니다.
          </Text>
        </View>
      </View>
    );
  }

  // 데이터가 없을 때
  if (!noticePostsPage?.content?.length) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>공지사항이 없습니다.</Text>
        </View>
      </View>
    );
  }

  // 아이템 렌더링
  const renderItem = ({ item }: { item: NoticePost }) => {
    return <FeedItem type="notice" noticePost={item} onPress={onPressItem} />;
  };

  return (
    <View style={styles.container}>
      <HeaderSection title={title} onPressViewAll={onPressViewAll} />
      <FlatList
        data={noticePostsPage.content}
        renderItem={renderItem}
        keyExtractor={(item) => item.noticePostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// 헤더 섹션 컴포넌트
function HeaderSection({
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
    marginVertical: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
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
  },
  listContent: {
    paddingHorizontal: 8,
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
