import React, { useMemo } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import QuestionBoardIcon from "@/assets/icons/tab/home/Question-Board.svg";
import FeedListHeader from "@/components/common/FeedListHeader";
import BoardItem from "@/components/common/BoardItem";
import { useGetQuestionsFilter } from "@/hooks/queries/useGetQuestions";
import { useQuestionPostStore } from "@/store/questionPostStore";

interface QuestionBoardListProps {
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

function QuestionBoardList({
  onPressViewAll,
  onPressItem,
}: QuestionBoardListProps) {
  // API 호출 및 데이터 가져오기
  const { isLoading } = useGetQuestionsFilter();
  const { filteredQuestions } = useQuestionPostStore();

  // 최근 3개 질문만 추출
  const displayQuestions = useMemo(() => {
    if (!filteredQuestions || filteredQuestions.length === 0) return [];
    return filteredQuestions.slice(0, 3);
  }, [filteredQuestions]);

  // 포지션 결정 함수
  const getItemPosition = (index: number, totalItems: number) => {
    if (totalItems === 1) return "only";
    if (index === 0) return "first";
    if (index === totalItems - 1) return "last";
    return "middle";
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <FeedListHeader
          icon={<QuestionBoardIcon />}
          title="질문 게시판"
          activeTab="none"
          onTabChange={() => {}}
          onPressViewAll={onPressViewAll}
        />
      </View>

      <View style={styles.questionListContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#00E271" />
            <Text style={styles.loadingText}>질문을 불러오는 중...</Text>
          </View>
        ) : displayQuestions.length > 0 ? (
          <View style={styles.boardContainer}>
            {displayQuestions.map((question, index) => (
              <BoardItem
                type="question"
                key={question.questionPostId}
                questionPost={question}
                position={getItemPosition(index, displayQuestions.length)}
                onPress={onPressItem}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>표시할 질문이 없습니다.</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  headerContainer: {
    marginBottom: 12,
  },
  questionListContainer: {
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    overflow: "visible",
  },
  boardContainer: {},
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#666666",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F1F1",
  },
  emptyText: {
    fontSize: 14,
    color: "#929292",
  },
});

export default QuestionBoardList;
