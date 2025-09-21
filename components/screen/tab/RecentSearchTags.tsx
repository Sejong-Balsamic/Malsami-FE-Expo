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
    // shadowColor: "#0000001A",
    // shadowOpacity: 0,
    // shadowRadius: 10,
    // shadowOffset: { width: 1, height: 2 },
    // elevation: 2,
    boxShadow: "1px 2px 10px 0px #0000001A",
    // // iOS 그림자 (box-shadow: 1px 2px 10px 0px #0000001A)
    // shadowColor: "#000000",
    // shadowOpacity: 0.1, // #0000001A의 투명도 (26/255 ≈ 0.1)
    // shadowRadius: 10, // blur radius
    // shadowOffset: { width: 1, height: 2 }, // x: 1px, y: 2px
    // // Android 그림자
    // elevation: 3,
  },
  tagText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

export default RecentSearchTags;
