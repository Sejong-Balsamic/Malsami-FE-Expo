import { colors } from "@/constants";
import React, { ReactNode } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface TabButtonsProps {
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
  type?: "document" | "question";
}

function TabButtons({
  activeTab,
  onTabChange,
  type = "document",
}: TabButtonsProps) {
  const getTabColors = () => {
    if (type === "question") {
      return {
        activeBackgroundColor: colors.PRIMARY_SUB_BACKGROUND_COLOR,
        activeTextColor: colors.PRIMARY_SUB_COLOR,
      };
    }
    return {
      activeBackgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
      activeTextColor: colors.PRIMARY_COLOR,
    };
  };

  const { activeBackgroundColor, activeTextColor } = getTabColors();

  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "daily" && { backgroundColor: activeBackgroundColor },
        ]}
        onPress={() => onTabChange("daily")}
      >
        <Text
          style={
            activeTab === "daily"
              ? [styles.activeTabText, { color: activeTextColor }]
              : styles.tabText
          }
        >
          일간
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          activeTab === "weekly" && { backgroundColor: activeBackgroundColor },
        ]}
        onPress={() => onTabChange("weekly")}
      >
        <Text
          style={
            activeTab === "weekly"
              ? [styles.activeTabText, { color: activeTextColor }]
              : styles.tabText
          }
        >
          주간
        </Text>
      </TouchableOpacity>
    </View>
  );
}

interface FeedListHeaderProps {
  title: string;
  icon?: ReactNode;
  onPressViewAll?: () => void;
  activeTab: "daily" | "weekly" | "none";
  onTabChange: (tab: "daily" | "weekly") => void;
  type?: "document" | "question";
}

function FeedListHeader({
  title,
  icon,
  onPressViewAll,
  activeTab,
  onTabChange,
  type = "document",
}: FeedListHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {icon}
        <Text style={styles.titleText}>{title}</Text>
        {activeTab !== "none" && (
          <TabButtons
            activeTab={activeTab}
            onTabChange={onTabChange}
            type={type}
          />
        )}
      </View>
      {onPressViewAll && <Text style={styles.viewAllText}>전체보기</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "700",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#666",
    textDecorationLine: "underline",
  },
  tabContainer: {
    flexDirection: "row",
  },
  tabButton: {
    backgroundColor: colors.TAB_BACKGROUND,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 12,
    color: colors.TAB_TEXT,
  },
  activeTab: {
    // 동적 색상은 인라인 스타일로 처리
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "600",
    // 동적 색상은 인라인 스타일로 처리
  },
});

export default FeedListHeader;
