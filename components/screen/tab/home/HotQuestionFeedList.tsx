import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { useQuestionPostStore } from "@/store/questionPostStore";
import FeedItem from "@/components/common/FeedItem";
import FeedListHeader from "@/components/common/FeedListHeader";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/common/FeedListStates";
import { QuestionPost } from "@/types/entities/postgres/questionPost";
import {
  useGetDailyQuestions,
  useGetWeeklyQuestions,
} from "@/hooks/queries/useGetQuestions";
import QuestionBoardIcon from "@/assets/icons/tab/home/Document-Hot.svg";

const { width: screenWidth } = Dimensions.get("window");

interface HotQuestionFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

export default function HotQuestionFeedList({
  title = "HOT 인기질문",
  onPressViewAll,
  onPressItem,
}: HotQuestionFeedListProps) {
  const { dailyQuestions, weeklyQuestions, activeTab, setActiveTab } =
    useQuestionPostStore();

  const dailyQuery = useGetDailyQuestions();
  const weeklyQuery = useGetWeeklyQuestions();

  const questions = activeTab === "daily" ? dailyQuestions : weeklyQuestions;
  const isLoading =
    activeTab === "daily" ? dailyQuery.isLoading : weeklyQuery.isLoading;
  const error = activeTab === "daily" ? dailyQuery.error : weeklyQuery.error;

  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cardWidth = screenWidth * 0.7;
  const cardMargin = 16;
  const totalCardWidth = cardWidth + cardMargin;

  const handleTabChange = useCallback(
    (tab: "daily" | "weekly") => {
      setActiveTab(tab);
      currentIndexRef.current = 0;
    },
    [setActiveTab]
  );

  const startAutoScroll = useCallback(() => {
    if (!questions || questions.length <= 1) return;

    autoScrollTimerRef.current = setInterval(() => {
      if (flatListRef.current && questions) {
        const nextIndex = (currentIndexRef.current + 1) % questions.length;

        try {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * totalCardWidth,
            animated: true,
          });
        } catch (error) {
          console.warn("Auto scroll error:", error);
          currentIndexRef.current = 0;
        }

        currentIndexRef.current = nextIndex;
      }
    }, 6500);
  }, [questions, totalCardWidth]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  const handleScrollEnd = useCallback(
    (event: any) => {
      if (!questions) return;

      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / totalCardWidth);

      if (newIndex >= 0 && newIndex < questions.length) {
        currentIndexRef.current = newIndex;
      }
    },
    [questions, totalCardWidth]
  );

  useEffect(() => {
    if (questions && questions.length > 1) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
    };
  }, [questions, startAutoScroll, stopAutoScroll]);

  useEffect(() => {
    stopAutoScroll();
    if (questions && questions.length > 1) {
      const timer = setTimeout(() => {
        startAutoScroll();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeTab, questions, startAutoScroll, stopAutoScroll]);

  const renderItem = ({ item }: { item: QuestionPost }) => {
    return (
      <View style={{ width: totalCardWidth, alignItems: "center" }}>
        <FeedItem
          type="question"
          size="small"
          questionPost={item}
          onPress={onPressItem}
        />
      </View>
    );
  };

  // Loading state
  if (isLoading && !questions) {
    return (
      <LoadingState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
        icon={<QuestionBoardIcon />}
        type="question"
      />
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
        icon={<QuestionBoardIcon />}
        type="question"
      />
    );
  }

  // Empty state
  if (!questions || questions.length === 0) {
    return (
      <EmptyState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
        icon={<QuestionBoardIcon />}
        type="question"
      />
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={<QuestionBoardIcon />}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          type="question"
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.questionPostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        pagingEnabled={false}
        snapToInterval={totalCardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={stopAutoScroll}
        onScrollEndDrag={() => {
          setTimeout(() => {
            if (questions && questions.length > 1) {
              startAutoScroll();
            }
          }, 3000);
        }}
        getItemLayout={(data, index) => ({
          length: totalCardWidth,
          offset: totalCardWidth * index,
          index,
        })}
        centerContent={true}
      />
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
  listContent: {
    paddingVertical: 4,
  },
});
