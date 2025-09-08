import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { useDocumentPostStore } from "@/store/documentPostStore";
import FeedItem from "@/components/common/FeedItem";
import FeedListHeader from "@/components/common/FeedListHeader";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/common/FeedListStates";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import DocumentHotIcon from "@/assets/icons/tab/home/Document-Hot.svg";

const { width: screenWidth } = Dimensions.get("window");

interface HotDocumentFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

export default function HotDocumentFeedList({
  title = "HOT 인기자료",
  onPressViewAll,
  onPressItem,
}: HotDocumentFeedListProps) {
  const { dailyDocuments, weeklyDocuments, activeTab, setActiveTab } =
    useDocumentPostStore();

  const dailyQuery = useGetDailyDocuments();
  const weeklyQuery = useGetWeeklyDocuments();

  const documents = activeTab === "daily" ? dailyDocuments : weeklyDocuments;
  const isLoading =
    activeTab === "daily" ? dailyQuery.isLoading : weeklyQuery.isLoading;
  const error = activeTab === "daily" ? dailyQuery.error : weeklyQuery.error;

  // 자동 스크롤을 위한 ref와 상태
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 카드 크기 및 간격 계산
  const cardWidth = screenWidth * 0.7; // FeedItem 너비 (최대 292px)
  const cardMargin = 16; // 카드 양쪽 마진
  const totalCardWidth = cardWidth + cardMargin;

  const handleTabChange = useCallback(
    (tab: "daily" | "weekly") => {
      setActiveTab(tab);
      // 탭 변경 시 자동 스크롤 리셋
      currentIndexRef.current = 0;
    },
    [setActiveTab]
  );

  // 자동 스크롤 함수
  const startAutoScroll = useCallback(() => {
    if (!documents || documents.length <= 1) return;

    autoScrollTimerRef.current = setInterval(() => {
      if (flatListRef.current && documents) {
        const nextIndex = (currentIndexRef.current + 1) % documents.length;

        try {
          flatListRef.current.scrollToOffset({
            offset: nextIndex * totalCardWidth,
            animated: true,
          });
        } catch (error) {
          // 스크롤 에러 발생 시 현재 인덱스 리셋
          console.warn("Auto scroll error:", error);
          currentIndexRef.current = 0;
        }

        currentIndexRef.current = nextIndex;
      }
    }, 6500); // 5초마다 스크롤
  }, [documents, totalCardWidth]);

  // 자동 스크롤 정지 함수
  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  // 수동 스크롤 감지 핸들러
  const handleScrollEnd = useCallback(
    (event: any) => {
      if (!documents) return;

      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / totalCardWidth);

      if (newIndex >= 0 && newIndex < documents.length) {
        currentIndexRef.current = newIndex;
      }
    },
    [documents, totalCardWidth]
  );

  // 자동 스크롤 시작/정지 관리
  useEffect(() => {
    if (documents && documents.length > 1) {
      // 데이터가 로드되면 자동 스크롤 시작
      startAutoScroll();
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      stopAutoScroll();
    };
  }, [documents, startAutoScroll, stopAutoScroll]);

  // 탭 변경 시 자동 스크롤 재시작
  useEffect(() => {
    stopAutoScroll();
    if (documents && documents.length > 1) {
      // 약간의 딜레이 후 자동 스크롤 시작 (탭 전환 애니메이션 완료 후)
      const timer = setTimeout(() => {
        startAutoScroll();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [activeTab, documents, startAutoScroll, stopAutoScroll]);

  const renderItem = ({ item }: { item: DocumentPost }) => {
    return (
      <View style={{ width: totalCardWidth, alignItems: "center" }}>
        <FeedItem
          type="document"
          size="small"
          documentPost={item}
          onPress={onPressItem}
        />
      </View>
    );
  };

  // Loading state
  if (isLoading && !documents) {
    return (
      <LoadingState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
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
      />
    );
  }

  // Empty state
  if (!documents || documents.length === 0) {
    return (
      <EmptyState
        title={title}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onPressViewAll={onPressViewAll}
      />
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={<DocumentHotIcon />}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.documentPostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        pagingEnabled={false}
        snapToInterval={totalCardWidth}
        snapToAlignment="center"
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={stopAutoScroll} // 사용자가 스크롤 시작하면 자동 스크롤 정지
        onScrollEndDrag={() => {
          // 사용자 스크롤 완료 후 3초 뒤 자동 스크롤 재시작
          setTimeout(() => {
            if (documents && documents.length > 1) {
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
