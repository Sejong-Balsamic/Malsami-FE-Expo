import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import { QuestionPost } from "@/types/entities/postgres/questionPost";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FeedItemImage from "./FeedItemImage";
import FeedItemContent from "./FeedItemContent";
import FeedItemBadge from "./FeedItemBadge";

interface FeedItemProps {
  type: "notice" | "document" | "question";
  size?: "small" | "large";
  noticePost?: NoticePost;
  documentPost?: DocumentPost;
  questionPost?: QuestionPost;
  onPress?: (id: string) => void;
}

const { width } = Dimensions.get("window");

function FeedItem({
  type = "notice",
  size = "small",
  noticePost,
  documentPost,
  questionPost,
  onPress,
}: FeedItemProps) {
  const feedData =
    type === "notice"
      ? noticePost
      : type === "document"
      ? documentPost
      : questionPost;
  const hasThumbnail = type === "document" && documentPost?.thumbnailUrl;

  const handlePress = () => {
    if (!feedData) return;

    const id =
      type === "notice"
        ? noticePost?.noticePostId
        : type === "document"
        ? documentPost?.documentPostId
        : questionPost?.questionPostId;

    if (id && onPress) {
      onPress(id);
    }
  };

  if (!feedData) return null;

  const containerStyle = [
    size === "large" ? styles.largeContainer : styles.container,
    !hasThumbnail && styles.noImageContainer,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={handlePress}>
      {hasThumbnail ? (
        <FeedItemImage thumbnailUrl={documentPost.thumbnailUrl!} />
      ) : (
        <View style={styles.noImageHeader}>
          <FeedItemBadge
            subject={
              type === "document"
                ? documentPost?.subject
                : type === "question"
                ? questionPost?.subject
                : undefined
            }
            type={type}
          />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {feedData.title}
          </Text>
        </View>
      )}

      <FeedItemContent
        title={feedData.title || ""}
        content={feedData.content || ""}
        subject={
          type === "document"
            ? documentPost?.subject
            : type === "question"
            ? questionPost?.subject
            : undefined
        }
        showBadge={Boolean(hasThumbnail)}
        showTitle={Boolean(hasThumbnail)}
        documentTypes={
          type === "document" ? documentPost?.documentTypes : undefined
        }
        customTags={
          type === "document"
            ? documentPost?.customTags
            : type === "question"
            ? questionPost?.customTags
            : undefined
        }
        likeCount={feedData.likeCount}
        isLiked={
          type === "document"
            ? documentPost?.isLiked
            : type === "question"
            ? questionPost?.isLiked
            : undefined
        }
        type={type}
        size={size}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    maxWidth: 292,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: "visible",
  },
  largeContainer: {
    width: width - 32, // 전체 너비에서 마진 제외
    maxWidth: width - 32,
    backgroundColor: "white",
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: "visible",
  },
  noImageContainer: {
    height: "auto",
    paddingBottom: 8,
  },
  noImageHeader: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
});

export default FeedItem;
