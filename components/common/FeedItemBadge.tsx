import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface FeedItemBadgeProps {
  subject?: string;
  type: "notice" | "document" | "question";
}

export default function FeedItemBadge({ subject, type }: FeedItemBadgeProps) {
  if (!subject) return null;

  const getBadgeColor = () => {
    switch (type) {
      case "document":
        return colors.PRIMARY_DOCUMENT_COLOR;
      case "question":
        return colors.PRIMARY_QUESTION_COLOR;
      case "notice":
      default:
        return colors.PRIMARY_DOCUMENT_COLOR; // notice는 document와 같은 색상
    }
  };

  const badgeColor = getBadgeColor();

  return (
    <View style={[styles.badge, { backgroundColor: badgeColor }]}>
      <Text style={styles.badgeText}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
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
});
