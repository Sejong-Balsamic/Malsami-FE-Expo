import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface FeedItemImageProps {
  thumbnailUrl: string;
}

export default function FeedItemImage({ thumbnailUrl }: FeedItemImageProps) {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    position: "relative",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
