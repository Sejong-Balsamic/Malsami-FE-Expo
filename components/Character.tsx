import React from "react";
import { View, Image, StyleSheet } from "react-native";

// 분리된 파츠 (실제 파일 경로로 바꿔주세요)
const PARTS = {
  body: require("@/assets/images/character/SMBody.png"), // 133×147
  armLeft: require("@/assets/images/character/SMLeftArm.png"), //  51×51
  armRight: require("@/assets/images/character/SMRightArm.png"), //  33×35
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
    // 몸통(133×147) + 팔이 걸치는 영역(약 31px)을 감안한 높이
    width: 133,
    height: 178,
    position: "relative",
  },
  // 몸통 (zIndex=1)
  body: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 133,
    height: 147,
    zIndex: -10,
  },
  // 왼쪽 팔 (zIndex=2), bottom 에 걸치도록 top 값을 147 - (팔높이 ÷ 2) 정도로
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
