import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import FeedItemBadge from "./FeedItemBadge";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants";
import { QuestionPost } from "@/types/entities/postgres/questionPost";

interface BoardItemProps {
  type: "document" | "question";
  documentPost?: DocumentPost;
  questionPost?: QuestionPost;
  position: "first" | "middle" | "last" | "only";
  onPress?: (id: string) => void;
}

function BoardItem({
  type,
  documentPost,
  questionPost,
  position,
  onPress,
}: BoardItemProps) {
  const postType = type === "document" ? documentPost : questionPost;
  const postData = {
    postId:
      type === "document"
        ? documentPost?.documentPostId
        : questionPost?.questionPostId,
    postSubject:
      type === "document" ? documentPost?.subject : questionPost?.subject,
    postTitle: type === "document" ? documentPost?.title : questionPost?.title,
    postContent:
      type === "document" ? documentPost?.content : questionPost?.content,
    postCustomTags:
      type === "document" ? documentPost?.customTags : questionPost?.customTags,
    postLikeCount:
      type === "document" ? documentPost?.likeCount : questionPost?.likeCount,
    postViewCount:
      type === "document" ? documentPost?.viewCount : questionPost?.viewCount,
  };
  const handlePress = () => {
    if (postData?.postId && onPress) {
      onPress(postData?.postId);
    }
  };

  const getContainerStyle = () => {
    const baseStyle = [styles.container];

    switch (position) {
      case "first":
        return [...baseStyle, styles.firstItem];
      case "middle":
        return [...baseStyle, styles.middleItem];
      case "last":
        return [...baseStyle, styles.lastItem];
      case "only":
        return [...baseStyle, styles.onlyItem];
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity style={getContainerStyle()} onPress={handlePress}>
      <View style={styles.content}>
        <View style={styles.badgeContainer}>
          <FeedItemBadge subject={postData?.postSubject} />
        </View>

        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {postData?.postTitle}
        </Text>

        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
          {postData?.postContent}
        </Text>

        <View style={styles.bottomInfo}>
          <View style={styles.tagsContainer}>
            {postData?.postCustomTags?.map((tag, index) => (
              <View key={index} style={styles.customTag}>
                <Text style={styles.customTagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <AntDesign name="like2" size={12} color={colors.GRAY_25} />
              <Text style={styles.statText}>
                {postData?.postLikeCount || 0}
              </Text>
            </View>
            <View style={styles.statItem}>
              <AntDesign name="eye" size={12} color={colors.GRAY_25} />
              <Text style={styles.statText}>
                {postData?.postViewCount || 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F1F1F1",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  firstItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 0,
  },
  middleItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: colors.GRAY_125,
    borderBottomColor: colors.GRAY_125,
  },
  lastItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopWidth: 0,
  },
  onlyItem: {
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  badgeContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: "#616161",
    marginBottom: 16,
    lineHeight: 20,
  },
  bottomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagsContainer: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    marginRight: 12,
  },
  customTag: {
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  customTagText: {
    fontSize: 12,
    color: "#4A90E2",
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    gap: 4,
    flexDirection: "row",
    marginLeft: 8,
    alignItems: "center",
  },
  statText: {
    fontSize: 12,
    color: "#C5C5C5",
    fontWeight: "500",
  },
});

export default BoardItem;
