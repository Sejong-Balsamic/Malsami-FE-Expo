import React from "react";
import { View, Image, StyleSheet } from "react-native";

const PARTS = {
  body: require("@/assets/images/character/SMBody.png"),
  armLeft: require("@/assets/images/character/SMLeftArm.png"),
  armRight: require("@/assets/images/character/SMRightArm.png"),
} as const;

type CharacterProps = {
  style?: object;
};

export default function Character({ style }: CharacterProps) {
  return (
    <View style={[styles.container, style]}>
      <Image source={PARTS.body} style={styles.body} />
      <Image source={PARTS.armLeft} style={styles.armLeft} />
      <Image source={PARTS.armRight} style={styles.armRight} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 133,
    height: 178,
    position: "relative",
  },
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 133,
    height: 147,
    zIndex: -10,
  },
  armLeft: {
    position: "absolute",
    top: 105,
    left: 25,
    width: 51,
    height: 51,
    zIndex: 20,
    backgroundColor: "fill",
  },
  // 오른쪽 팔
  armRight: {
    position: "absolute",
    top: 117,
    left: 92,
    width: 33,
    height: 35,
    zIndex: 20,
  },
});
