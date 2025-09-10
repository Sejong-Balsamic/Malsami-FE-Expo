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
  type: "notice" | "document" | "question";
  size?: "small" | "large";
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
  size = "small",
}: FeedItemContentProps) {
  const containerStyle =
    size === "large" ? styles.largeContentContainer : styles.contentContainer;
  const titleStyle = size === "large" ? styles.largeTitle : styles.title;
  const contentStyle = size === "large" ? styles.largeContent : styles.content;

  return (
    <View style={containerStyle}>
      {showBadge && <FeedItemBadge subject={subject} type={type} />}
      {showTitle && (
        <Text
          style={titleStyle}
          numberOfLines={size === "large" ? 2 : 1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      )}
      <Text
        style={contentStyle}
        numberOfLines={size === "large" ? 3 : 2}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
      {(type === "document" || type === "question") && (
        <FeedItemTags
          documentTypes={documentTypes}
          customTags={customTags}
          likeCount={likeCount}
          isLiked={isLiked}
          size={size}
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
  largeContentContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  largeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
    lineHeight: 24,
  },
  content: {
    fontSize: 13,
    lineHeight: 18,
    color: "#555",
    marginVertical: 4,
  },
  largeContent: {
    fontSize: 14,
    lineHeight: 20,
    color: "#555",
    marginVertical: 6,
  },
});
