import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface RecentSearchTagsProps {
  tagName: string;
}

function RecentSearchTags({ tagName }: RecentSearchTagsProps) {
  return (
    <Pressable style={styles.tagContainer}>
      <Text style={styles.tagText}>{tagName}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    marginRight: 8,
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 32,
    paddingHorizontal: 12,
    paddingVertical: 8,
    // iOS 그림자
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 1, height: 2 },
    // Android 그림자
    elevation: 2,
  },
  tagText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

export default RecentSearchTags;
