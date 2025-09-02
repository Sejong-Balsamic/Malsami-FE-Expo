import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FeedItemImage from "./feed/FeedItemImage";
import FeedItemContent from "./feed/FeedItemContent";
import FeedItemBadge from "./feed/FeedItemBadge";

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

  if (!feedData) return null;

  return (
    <TouchableOpacity
      style={[styles.container, !hasThumbnail && styles.noImageContainer]}
      onPress={handlePress}
    >
      {hasThumbnail ? (
        <FeedItemImage thumbnailUrl={documentPost.thumbnailUrl!} />
      ) : (
        <View style={styles.noImageHeader}>
          <FeedItemBadge subject={documentPost?.subject} />
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {feedData.title}
          </Text>
        </View>
      )}

      <FeedItemContent
        title={feedData.title}
        content={feedData.content}
        subject={documentPost?.subject}
        showBadge={hasThumbnail}
        showTitle={hasThumbnail}
        documentTypes={documentPost?.documentTypes}
        customTags={documentPost?.customTags}
        likeCount={feedData.likeCount}
        isLiked={documentPost?.isLiked}
        type={type}
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
