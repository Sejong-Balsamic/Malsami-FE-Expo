import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { colors } from "@/constants";
import { timeAgo } from "@/utils/timeAgo";
import Icon from "@expo/vector-icons/Ionicons";

interface ListFeedItemProps {
  documentPost: DocumentPost;
  onPress: (id: string) => void;
}

export default function ListFeedItem({
  documentPost,
  onPress,
}: ListFeedItemProps) {
  const {
    documentPostId,
    title,
    content,
    likeCount,
    viewCount,
    thumbnailUrl,
    createdDate,
    subject,
  } = documentPost;

  return (
    <Pressable
      style={styles.container}
      onPress={() => documentPostId && onPress(documentPostId)}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={styles.courseChip}>
            <Text style={styles.courseText}>{subject}</Text>
          </View>
          {createdDate && (
            <Text style={styles.timeText}>{timeAgo(createdDate)}</Text>
          )}
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {content}
        </Text>
        <View style={styles.footer}>
          <Icon name="thumbs-up-outline" size={12} color={colors.GRAY_500} />
          <Text style={styles.footerText}>{likeCount}</Text>
          <Icon name="eye-outline" size={12} color={colors.GRAY_500} />
          <Text style={styles.footerText}>{viewCount}</Text>
        </View>
      </View>
      {thumbnailUrl && (
        <Image source={{ uri: thumbnailUrl }} style={styles.image} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_100,
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  courseChip: {
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  courseText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 12,
    color: colors.GRAY_400,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: colors.GRAY_500,
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.GRAY_200, // Placeholder color
  },
});
