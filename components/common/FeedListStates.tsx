import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import FeedListHeader from "./FeedListHeader";
import QuestionBoardIcon from "@/assets/icons/tab/home/Question-Board.svg";

interface LoadingStateProps {
  title: string;
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
  onPressViewAll?: () => void;
  icon?: React.ReactNode;
  type?: "document" | "question";
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
  icon = <QuestionBoardIcon />,
  type = "document",
}: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={icon}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={onTabChange}
          type={type}
        />
      </View>
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
  icon = <QuestionBoardIcon />,
  type = "document",
}: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={icon}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={onTabChange}
          type={type}
        />
      </View>
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
  icon = <QuestionBoardIcon />,
  type = "document",
}: EmptyStateProps) {
  const getDefaultMessage = () => {
    const period = activeTab === "daily" ? "일간 " : "주간 ";
    const content = type === "question" ? "인기 질문이" : "인기 자료가";
    return `${period}${content} 없습니다.`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={icon}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={onTabChange}
          type={type}
        />
      </View>
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>{message || getDefaultMessage()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerWithTabContainer: {
    marginBottom: 12,
  },
  loadingContainer: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    height: 200,
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
