import { colors } from "@/constants";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface RecentSearchTagsProps {
  tagName: string;
  onPress?: (tagName: string) => void;
  onDelete?: (tagName: string) => void;
  showDeleteButton?: boolean;
}

function RecentSearchTags({
  tagName,
  onPress,
  onDelete,
  showDeleteButton = false,
}: RecentSearchTagsProps) {
  const handlePress = () => {
    if (onPress) {
      onPress(tagName);
    }
  };

  const handleDelete = (e: any) => {
    e.stopPropagation(); // 태그 클릭 이벤트 방지
    if (onDelete) {
      onDelete(tagName);
    }
  };

  return (
    <Pressable style={styles.tagContainer} onPress={handlePress}>
      <Text style={styles.tagText}>{tagName}</Text>
      {showDeleteButton && (
        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Feather name="x" size={12} color={colors.GRAY_400} />
        </Pressable>
      )}
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
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tagText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  deleteButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.GRAY_100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecentSearchTags;
