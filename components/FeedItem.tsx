import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

interface FeedItemProps {
  type: "notice" | "document";
  noticePost?: NoticePost;
  documentPost?: DocumentPost;
  onPress?: (id: string) => void;
}

const { width } = Dimensions.get("window");

function FeedItem({
  type = "notice",
  noticePost,
  documentPost,
  onPress,
}: FeedItemProps) {
  // 공통 데이터 처리를 위한 객체
  const feedData = type === "notice" ? noticePost : documentPost;

  // 날짜 포맷팅 함수
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  // 클릭 이벤트 핸들러
  const handlePress = () => {
    if (!feedData) return;

    const id =
      type === "notice"
        ? noticePost?.noticePostId
        : documentPost?.documentPostId;

    if (id && onPress) {
      onPress(id);
    }
  };

  // 데이터가 없으면 렌더링하지 않음
  if (!feedData) return null;

  // 카드 배지 (document 타입인 경우 표시)
  const renderBadge = () => {
    if (type === "document" && documentPost?.documentTypes?.length) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{documentPost.documentTypes[0]}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.imageContainer}>
        {/* 썸네일 이미지 */}
        <Image
          source={
            type === "document" && documentPost?.thumbnailUrl
              ? { uri: documentPost.thumbnailUrl }
              : require("@/assets/images/icon.png")
          }
          style={styles.image}
          resizeMode="cover"
        />
        {/* 배지 */}
        {renderBadge()}
      </View>

      <View style={styles.contentContainer}>
        {/* 제목 */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {feedData.title}
        </Text>

        {/* 메타 정보: 작성자, 날짜 */}
        <View style={styles.metaContainer}>
          <Text style={styles.author}>
            {feedData.member?.studentName || "익명"}
          </Text>
          <Text style={styles.date}>{formatDate(feedData.createdDate)}</Text>
        </View>

        {/* 내용 미리보기 */}
        <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
          {feedData.content}
        </Text>

        {/* 하단 정보: 조회수, 좋아요 */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statText}>👁️ {feedData.viewCount || 0}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statText}>👍 {feedData.likeCount || 0}</Text>
          </View>
          {type === "document" && (
            <View style={styles.statItem}>
              <Text style={styles.statText}>
                💬 {feedData.commentCount || 0}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    maxWidth: 240,
    height: 250,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  imageContainer: {
    height: 120,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#2196F3",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  author: {
    fontSize: 12,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
    color: "#555",
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  statItem: {
    marginRight: 10,
  },
  statText: {
    fontSize: 12,
    color: "#888",
  },
});

export default FeedItem;
