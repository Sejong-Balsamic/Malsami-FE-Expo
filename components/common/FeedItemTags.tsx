import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/constants";

interface FeedItemTagsProps {
  documentTypes?: string[];
  customTags?: string[];
  likeCount?: number;
  isLiked?: boolean;
  size?: "small" | "large";
}

export default function FeedItemTags({
  documentTypes = [],
  customTags = [],
  likeCount,
  isLiked,
  size = "small",
}: FeedItemTagsProps) {
  const tags = [...documentTypes, ...customTags];

  if (tags.length === 0) return null;

  const formatLikeCount = (count?: number) => {
    if (!count) return "0";
    if (count >= 1000) return "999+";
    return count;
  };

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
          name={isLiked ? "like1" : "like2"}
          size={16}
          color={isLiked ? colors.PRIMARY_DOCUMENT_COLOR : colors.GRAY_500}
        />
        <Text
          style={[
            styles.likeText,
            isLiked && { color: colors.PRIMARY_DOCUMENT_COLOR },
          ]}
        >
          {formatLikeCount(likeCount)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  tag: {
    backgroundColor: colors.PRIMARY_DOCUMENT_BACKGROUND_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11,
    color: colors.PRIMARY_DOCUMENT_COLOR,
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
