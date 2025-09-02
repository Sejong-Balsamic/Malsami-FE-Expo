import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FeedItemBadge from "./FeedItemBadge";
import FeedItemTags from "./FeedItemTags";

interface FeedItemContentProps {
  title: string;
  content: string;
  subject?: string;
  showBadge?: boolean;
  showTitle?: boolean;
  documentTypes?: string[];
  customTags?: string[];
  likeCount?: number;
  isLiked?: boolean;
  type: "notice" | "document";
}

export default function FeedItemContent({
  title,
  content,
  subject,
  showBadge = true,
  showTitle = true,
  documentTypes,
  customTags,
  likeCount,
  isLiked,
  type,
}: FeedItemContentProps) {
  return (
    <View style={styles.contentContainer}>
      {showBadge && <FeedItemBadge subject={subject} />}
      {showTitle && (
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      )}
      <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
        {content}
      </Text>
      {type === "document" && (
        <FeedItemTags
          documentTypes={documentTypes}
          customTags={customTags}
          likeCount={likeCount}
          isLiked={isLiked}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
});
