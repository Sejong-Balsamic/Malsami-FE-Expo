import React from "react";
import { StyleSheet, View } from "react-native";
import { useNoticePostStore } from "@/store/noticePostStore";
import NoticeFeedList from "./NoticeFeedList";

interface NotificationSectionProps {}

function NotificationSection({}: NotificationSectionProps) {
  const { noticePostsPage, isLoading, error } = useNoticePostStore();

  if (isLoading || error || !noticePostsPage?.content?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NoticeFeedList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default NotificationSection;
