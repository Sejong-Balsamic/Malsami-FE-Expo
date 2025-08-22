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
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants";

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
  const feedData = type === "notice" ? noticePost : documentPost;
  const hasThumbnail = type === "document" && documentPost?.thumbnailUrl;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

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

  const formatLikeCount = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000) return "999+";
    return count;
  };

  if (!feedData) return null;

  const renderBadge = () => {
    if (type === "document" && documentPost?.subject) {
      return (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{documentPost.subject}</Text>
        </View>
      );
    }
    return null;
  };

  const renderTags = () => {
    if (type !== "document") return null;

    const tags = [
      ...(documentPost?.documentTypes || []),
      ...(documentPost?.customTags || []),
    ];

    if (tags.length === 0) return null;

    return (
      <View style={styles.tagContainer}>
        <View style={{ gap: 4, flexDirection: "row" }}>
          {tags.slice(0, 2).map((tag, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
        <View style={styles.likeContainer}>
          <AntDesign
            name={documentPost?.isLiked ? "like1" : "like2"}
            size={16}
            color={
              documentPost?.isLiked ? colors.PRIMARY_COLOR : colors.GRAY_500
            }
          />
          <Text
            style={[
              styles.likeText,
              documentPost?.isLiked && { color: colors.PRIMARY_COLOR },
            ]}
          >
            {formatLikeCount(feedData.likeCount)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[styles.container, !hasThumbnail && styles.noImageContainer]}
      onPress={handlePress}
    >
      {hasThumbnail ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: documentPost.thumbnailUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      ) : (
        <View style={styles.noImageHeader}>
          {renderBadge()}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {feedData.title}
          </Text>
        </View>
      )}

      <View style={styles.contentContainer}>
        {hasThumbnail && (
          <>
            {renderBadge()}
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {feedData.title}
            </Text>
          </>
        )}
        <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
          {feedData.content}
        </Text>
        {renderTags()}
        {/* <View style={styles.bottomContainer}>
          <View style={styles.metaContainer}>
            <Text style={styles.author}>
              {feedData.member?.studentName || "익명"}
            </Text>
            <Text style={styles.date}>{formatDate(feedData.createdDate)}</Text>
          </View>
          <View style={styles.likeContainer}>
            <AntDesign
              name={documentPost?.isLiked ? "like1" : "like2"}
              size={16}
              color={
                documentPost?.isLiked ? colors.PRIMARY_COLOR : colors.GRAY_500
              }
            />
            <Text
              style={[
                styles.likeText,
                documentPost?.isLiked && { color: colors.PRIMARY_COLOR },
              ]}
            >
              {formatLikeCount(feedData.likeCount)}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.7,
    maxWidth: 292,
    height: 250,
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
  noImageContainer: {
    height: "auto",
    paddingBottom: 12,
  },
  imageContainer: {
    height: 120,
    width: "100%",
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  noImageHeader: {
    padding: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    backgroundColor: colors.PRIMARY_COLOR,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  badgeText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
    color: "#555",
    marginVertical: 4,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: colors.PRIMARY_COLOR,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
  },
  metaContainer: {
    justifyContent: "flex-end",
  },
  author: {
    fontSize: 12,
    color: "#666",
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  likeText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.GRAY_500,
  },
});

export default FeedItem;
