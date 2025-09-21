import { colors } from "@/constants";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface RecentSearchTagsProps {
  tagName: string;
  onPress?: (tagName: string) => void;
}

function RecentSearchTags({ tagName, onPress }: RecentSearchTagsProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(tagName);
    }
  };

  return (
    <Pressable style={styles.tagContainer} onPress={handlePress}>
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
    boxShadow: "1px 2px 10px 0px #0000001A",
  },
  tagText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

export default RecentSearchTags;
