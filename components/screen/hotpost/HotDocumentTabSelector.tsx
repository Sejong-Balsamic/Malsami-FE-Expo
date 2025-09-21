import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/constants";

type TabType = "daily" | "weekly";

interface HotDocumentTabSelectorProps {
  activeTab: TabType;
  onTabPress: (tab: TabType, index: number) => void;
}

export default function HotDocumentTabSelector({
  activeTab,
  onTabPress,
}: HotDocumentTabSelectorProps) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "daily" && styles.activeTabItem]}
        onPress={() => onTabPress("daily", 0)}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "daily" && styles.activeTabText,
          ]}
        >
          일간
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabItem, activeTab === "weekly" && styles.activeTabItem]}
        onPress={() => onTabPress("weekly", 1)}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "weekly" && styles.activeTabText,
          ]}
        >
          주간
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    borderBottomColor: colors.GRAY_100,
    paddingHorizontal: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: colors.GRAY_175,
  },
  activeTabItem: {
    borderBottomWidth: 4,
    borderBottomColor: colors.PRIMARY_DOCUMENT_COLOR,
  },
  tabText: {
    fontSize: 16,
    color: colors.GRAY_500,
  },
  activeTabText: {
    fontWeight: "bold",
    color: colors.PRIMARY_DOCUMENT_COLOR,
  },
});
