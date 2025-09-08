import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/constants";

interface FeedItemBadgeProps {
  subject?: string;
}

export default function FeedItemBadge({ subject }: FeedItemBadgeProps) {
  if (!subject) return null;

  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{subject}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
