import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/constants";

interface FeedListHeaderProps {
  title: string;
  onPressViewAll?: () => void;
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
}

export default function FeedListHeader({
  title,
  onPressViewAll,
  activeTab,
  onTabChange,
}: FeedListHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.hotIcon}>🔥</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <TabButtons activeTab={activeTab} onTabChange={onTabChange} />
      {onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>전체보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

function TabButtons({
  activeTab,
  onTabChange,
}: {
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "daily" && styles.activeTab]}
        onPress={() => onTabChange("daily")}
      >
        <Text
          style={activeTab === "daily" ? styles.activeTabText : styles.tabText}
        >
          일간
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "weekly" && styles.activeTab]}
        onPress={() => onTabChange("weekly")}
      >
        <Text
          style={activeTab === "weekly" ? styles.activeTabText : styles.tabText}
        >
          주간
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hotIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
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
    marginTop: 8,
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
    backgroundColor: colors.PRIMARY_BACKGROUND_COLOR,
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.PRIMARY_COLOR,
  },
});
