import React from "react";
import { StyleSheet, View, Text } from "react-native";

interface HotQuestionFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

function HotQuestionFeedList({
  title,
  onPressViewAll,
  onPressItem,
}: HotQuestionFeedListProps) {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default HotQuestionFeedList;
