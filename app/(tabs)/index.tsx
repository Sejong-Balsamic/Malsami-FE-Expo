import NoticeFeedList from "@/components/screen/tab/home/NoticeFeedList";
import HotDocumentFeedList from "@/components/screen/tab/home/HotDocumentFeedList";
import DocumentBoardList from "@/components/screen/tab/home/DocumentBoardList";
import WelcomeSection from "@/components/screen/tab/home/WelcomeSection";
import useAuth from "@/hooks/queries/useAuth";
import { useGetNoticeFilter } from "@/hooks/queries/useGetNotices";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import {
  useGetDailyQuestions,
  useGetWeeklyQuestions,
  useGetQuestionsFilter,
} from "@/hooks/queries/useGetQuestions";
import Toast from "react-native-toast-message";
import { useAuthModal } from "@/context/AuthModalContext";
import AuthRouteModal from "@/components/auth/AuthRouteModal";
import QuestionBoardList from "@/components/screen/tab/home/QuestionBoardList";
import HotQuestionFeedList from "@/components/screen/tab/home/HotQuestionFeedList";

export default function HomeScreen() {
  const { auth } = useAuth();
  const { isVisible, hide, show } = useAuthModal();

  const dailyDocumentsQuery = useGetDailyDocuments({
    enabled: !!auth?.memberId,
  });
  const weeklyDocumentsQuery = useGetWeeklyDocuments({
    enabled: !!auth?.memberId,
  });
  const dailyQuestionsQuery = useGetDailyQuestions({
    enabled: !!auth?.memberId,
  });
  const weeklyQuestionsQuery = useGetWeeklyQuestions({
    enabled: !!auth?.memberId,
  });
  const questionsFilterQuery = useGetQuestionsFilter({
    enabled: !!auth?.memberId,
  });
  const noticeQuery = useGetNoticeFilter({
    enabled: true,
  });

  useFocusEffect(
    useCallback(() => {
      console.log("메인 화면 포커스 - 캐시 상태 확인");
      if (noticeQuery.isStale) {
        console.log("공지사항 데이터가 stale 상태 - 재조회");
        noticeQuery.refetch();
      }
      if (auth?.memberId) {
        if (dailyDocumentsQuery.isStale) {
          console.log("일일 문서 데이터가 stale 상태 - 재조회");
          dailyDocumentsQuery.refetch();
        }
        if (weeklyDocumentsQuery.isStale) {
          console.log("주간 문서 데이터가 stale 상태 - 재조회");
          weeklyDocumentsQuery.refetch();
        }
        if (dailyQuestionsQuery.isStale) {
          console.log("일일 질문 데이터가 stale 상태 - 재조회");
          dailyQuestionsQuery.refetch();
        }
        if (weeklyQuestionsQuery.isStale) {
          console.log("주간 질문 데이터가 stale 상태 - 재조회");
          weeklyQuestionsQuery.refetch();
        }
        if (questionsFilterQuery.isStale) {
          console.log("필터된 질문 데이터가 stale 상태 - 재조회");
          questionsFilterQuery.refetch();
        }
      }
    }, [
      auth?.memberId, // Document 쿼리 의존성
      dailyDocumentsQuery,
      weeklyDocumentsQuery,
      dailyQuestionsQuery,
      weeklyQuestionsQuery,
      questionsFilterQuery,
      noticeQuery,
    ])
  );

  useEffect(() => {
    if (auth?.memberId && auth?.studentName) {
      Toast.show({
        type: "success",
        text1: "로그인 성공",
        text2: `${auth.studentName}님 환영합니다.`,
        position: "top",
        topOffset: 1500,
      });
    }
  }, [auth?.memberId, auth?.studentName]);

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <WelcomeSection
            authData={auth}
            onPressLogin={() => router.replace("/auth")}
            onSearchPress={(query) => {
              console.log("검색 실행:", query);
              // TODO: 검색 로직 구현
            }}
          />
          <NoticeFeedList
            onPressViewAll={() => {
              if (!auth?.memberId) {
                return show();
              }
              // TODO: 공지사항 전체보기 페이지로 이동
              console.log("전체보기: 공지사항");
              // router.push("/notice"); // 공지사항 페이지가 생성되면 주석 해제
            }}
            onPressItem={(id) => {
              if (!auth?.memberId) {
                return show();
              }
              // TODO: 공지사항 상세 페이지로 이동
              console.log(`공지사항 상세: ${id}`);
              // router.push(`/notice/${id}`); // 공지사항 상세 페이지가 생성되면 주석 해제
            }}
          />
          <HotDocumentFeedList
            onPressViewAll={() => {
              if (!auth?.memberId) {
                return show();
              }
              router.push("/hotpost");
            }}
            onPressItem={(id) => {
              if (!auth?.memberId) {
                return show();
              }
              router.push(`/hotpost/${id}?type=document`);
            }}
          />
          <DocumentBoardList
            onPressViewAll={() => {
              if (!auth?.memberId) {
                return show();
              }
              // TODO: 자료 게시판 전체보기 페이지로 이동
              console.log("전체보기: 자료 게시판");
            }}
            onPressItem={(id) => {
              if (!auth?.memberId) {
                return show();
              }
              router.push(`/hotpost/${id}?type=document`);
            }}
          />
          <HotQuestionFeedList
            onPressViewAll={() => {
              if (!auth?.memberId) {
                return show();
              }
              router.push("/hotpost");
            }}
            onPressItem={(id) => {
              if (!auth?.memberId) {
                return show();
              }
              router.push(`/hotpost/${id}?type=question`);
            }}
          />
          <QuestionBoardList
            onPressViewAll={() => {
              if (!auth?.memberId) {
                return show();
              }
              console.log("전체보기: 질문 게시판");
            }}
            onPressItem={(id) => {
              if (!auth?.memberId) {
                return show();
              }
              router.push(`/hotpost/${id}?type=question`);
            }}
          />
        </View>
      </ScrollView>
      {isVisible && (
        <AuthRouteModal
          onPress={() => {
            hide();
            router.replace("/auth");
          }}
          hide={hide}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
