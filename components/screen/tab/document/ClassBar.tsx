import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Coin from "@/assets/icons/tab/document/Coin.svg";
import Level1Icon from "@/assets/icons/tab/document/Level1.svg";
import Level2Icon from "@/assets/icons/tab/document/Level2.svg";
import Level3Icon from "@/assets/icons/tab/document/Level3.svg";
import Level4Icon from "@/assets/icons/tab/document/Level4.svg";

interface ClassBarProps {}

function ClassBar({}: ClassBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.classContainer}>
        <Coin />
        <Text style={styles.classText}>계급 계시판</Text>
      </View>
      <Text style={styles.classDesc}>
        엽전을 모아 더 높은 계급의 게시판을 사용하세요!
      </Text>
      <View style={styles.classLevelContainer}>
        <View style={styles.levelIconContainer}>
          <View style={styles.levelIconWrapper}>
            <Level1Icon style={styles.levelIcon} />
          </View>
          <Text style={[styles.levelText, styles.userLevelText]}>천민</Text>
        </View>
        <View style={styles.levelIconContainer}>
          <View style={styles.levelIconWrapper}>
            <Level2Icon style={styles.levelIcon} />
          </View>
          <Text style={styles.levelText}>중인</Text>
        </View>
        <View style={styles.levelIconContainer}>
          <View style={styles.levelIconWrapper}>
            <Level3Icon style={styles.levelIcon} />
          </View>
          <Text style={styles.levelText}>양반</Text>
        </View>
        <View style={styles.levelIconContainer}>
          <View style={styles.levelIconWrapper}>
            <Level4Icon style={styles.levelIcon} />
          </View>
          <Text style={styles.levelText}>왕</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  classContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // backgroundColor: colors.PRIMARY_DOCUMENT_COLOR,
  },
  classText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.UNCHANGED_BLACK,
  },
  classDesc: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 32,
    color: colors.TAB_TEXT,
    marginBottom: 16,
  },
  classLevelContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 8,
  },
  levelIconContainer: {
    alignItems: "center",
  },
  levelIconWrapper: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.PRIMARY_DOCUMENT_COLOR,
    marginBottom: 8,
    backgroundColor: colors.TAB_BACKGROUND,
  },
  levelIcon: {
    width: 24,
    height: 24,
  },
  levelText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.TAB_TEXT,
  },
  userLevelText: {
    color: colors.UNCHANGED_BLACK,
  },
});

export default ClassBar;
