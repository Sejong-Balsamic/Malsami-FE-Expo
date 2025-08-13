import React from "react";
import { StyleSheet, View } from "react-native";
import { useNoticePostStore } from "@/store/noticePostStore";
import NotificationList from "@/components/NotificationList";

interface NotificationSectionProps {}

function NotificationSection({}: NotificationSectionProps) {
  const { noticePostsPage, isLoading, error } = useNoticePostStore();

  if (isLoading || error || !noticePostsPage?.content?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <NotificationList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

export default NotificationSection;
