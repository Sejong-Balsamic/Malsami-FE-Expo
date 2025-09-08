import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

interface LoadingStateProps {
  title: string;
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
  onPressViewAll?: () => void;
}

interface ErrorStateProps extends LoadingStateProps {
  message?: string;
}

interface EmptyStateProps extends LoadingStateProps {
  message?: string;
}

export function LoadingState({
  title,
  activeTab,
  onTabChange,
  onPressViewAll,
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </View>
  );
}

export function ErrorState({
  title,
  activeTab,
  onTabChange,
  onPressViewAll,
  message = "인기자료를 불러오는 중 오류가 발생했습니다.",
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    </View>
  );
}

export function EmptyState({
  title,
  activeTab,
  onTabChange,
  onPressViewAll,
  message,
}: EmptyStateProps) {
  const defaultMessage = `${
    activeTab === "daily" ? "일간 " : "주간 "
  }인기 자료가 없습니다.`;

  return (
    <View style={styles.container}>
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{message || defaultMessage}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  loadingContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
});
