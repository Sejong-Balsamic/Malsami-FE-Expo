import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { StyleSheet, View, FlatList, Dimensions } from "react-native";
import { useGetNoticeFilter } from "@/hooks/queries/useGetNotices";
import FeedItem from "@/components/common/FeedItem";
import FeedListHeader from "@/components/common/FeedListHeader";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "@/components/common/FeedListStates";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import NoticeIcon from "@/assets/icons/tab/home/Notice-Megaphone.svg";

const { width: screenWidth } = Dimensions.get("window");

interface NoticeFeedListProps {
  title?: string;
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

export default function NoticeFeedList({
  title = "공지사항",
  onPressViewAll,
  onPressItem,
}: NoticeFeedListProps) {
  const { data: noticePostsData, isLoading, error } = useGetNoticeFilter();

  // 자동 스크롤을 위한 ref와 상태
  const flatListRef = useRef<FlatList>(null);
  const currentIndexRef = useRef(0);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 카드 크기 및 간격 계산
  const cardWidth = screenWidth * 0.7; // FeedItem 너비 (최대 292px)
  const cardMargin = 16; // 카드 양쪽 마진
  const totalCardWidth = cardWidth + cardMargin;

  // Extract notice posts from the response
  const noticePosts = useMemo(() => {
    return noticePostsData?.noticePostsPage?.content || [];
  }, [noticePostsData]);

  // 자동 스크롤 함수
  const startAutoScroll = useCallback(() => {
    if (!noticePosts || noticePosts.length <= 1) return;

    autoScrollTimerRef.current = setInterval(() => {
      if (flatListRef.current && noticePosts) {
        const nextIndex = (currentIndexRef.current + 1) % noticePosts.length;

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
    }, 6500); // 6.5초마다 스크롤
  }, [noticePosts, totalCardWidth]);

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
      if (!noticePosts) return;

      const contentOffsetX = event.nativeEvent.contentOffset.x;
      const newIndex = Math.round(contentOffsetX / totalCardWidth);

      if (newIndex >= 0 && newIndex < noticePosts.length) {
        currentIndexRef.current = newIndex;
      }
    },
    [noticePosts, totalCardWidth]
  );

  // 자동 스크롤 시작/정지 관리
  useEffect(() => {
    if (noticePosts && noticePosts.length > 1) {
      // 데이터가 로드되면 자동 스크롤 시작
      startAutoScroll();
    }

    return () => {
      // 컴포넌트 언마운트 시 타이머 정리
      stopAutoScroll();
    };
  }, [noticePosts, startAutoScroll, stopAutoScroll]);

  const renderItem = ({ item }: { item: NoticePost }) => {
    return (
      <View style={{ width: totalCardWidth, alignItems: "center" }}>
        <FeedItem
          type="notice"
          size="small"
          noticePost={item}
          onPress={onPressItem}
        />
      </View>
    );
  };

  // Loading state
  if (isLoading && !noticePosts) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWithTabContainer}>
          <FeedListHeader
            icon={<NoticeIcon />}
            title={title}
            onPressViewAll={onPressViewAll}
            activeTab="none"
            onTabChange={() => {}}
          />
        </View>
        <LoadingState title="" activeTab="daily" onTabChange={() => {}} />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWithTabContainer}>
          <FeedListHeader
            icon={<NoticeIcon />}
            title={title}
            onPressViewAll={onPressViewAll}
            activeTab="none"
            onTabChange={() => {}}
          />
        </View>
        <ErrorState title="" activeTab="daily" onTabChange={() => {}} />
      </View>
    );
  }

  // Empty state
  if (!noticePosts || noticePosts.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.headerWithTabContainer}>
          <FeedListHeader
            icon={<NoticeIcon />}
            title={title}
            onPressViewAll={onPressViewAll}
            activeTab="none"
            onTabChange={() => {}}
          />
        </View>
        <EmptyState title="" activeTab="daily" onTabChange={() => {}} />
      </View>
    );
  }

  // Success state
  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <FeedListHeader
          icon={<NoticeIcon />}
          title={title}
          onPressViewAll={onPressViewAll}
          activeTab="none"
          onTabChange={() => {}}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={noticePosts}
        renderItem={renderItem}
        keyExtractor={(item) => item.noticePostId || String(Math.random())}
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
            if (noticePosts && noticePosts.length > 1) {
              startAutoScroll();
            }
          }, 3000);
        }}
        getItemLayout={(data, index) => ({
          length: totalCardWidth,
          offset: totalCardWidth * index,
          index,
        })}
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
