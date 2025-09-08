import NoticeFeedList from "@/components/screen/tab/home/NoticeFeedList";
import HotDocumentFeedList from "@/components/screen/tab/home/HotDocumentFeedList";
import DocumentBoardList from "@/components/screen/tab/home/DocumentBoardList";
import WelcomeSection from "@/components/screen/tab/home/WelcomeSection";
import useAuth from "@/hooks/queries/useAuth";
import { useGetNoticePosts } from "@/hooks/queries/useGetNoticePosts";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";
import Toast from "react-native-toast-message";
import { useAuthModal } from "@/context/AuthModalContext";
import AuthRouteModal from "@/components/auth/AuthRouteModal";

export default function HomeScreen() {
  const { auth } = useAuth();
  const { isVisible, hide, show } = useAuthModal();

  const { refetch: refetchDailyDocuments } = useGetDailyDocuments();
  const { refetch: refetchWeeklyDocuments } = useGetWeeklyDocuments();
  const { refetch: refetchNoticePosts } = useGetNoticePosts({ enabled: false });

  useFocusEffect(
    useCallback(() => {
      console.log("메인 화면 포커스 - 데이터 로드 시작");
      refetchNoticePosts();
      if (auth?.memberId) {
        refetchDailyDocuments();
        refetchWeeklyDocuments();
      }
    }, [
      auth?.memberId,
      refetchDailyDocuments,
      refetchWeeklyDocuments,
      refetchNoticePosts,
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
              console.log(`자료 상세: ${id}`);
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
              // TODO: 자료 게시판 상세 페이지로 이동
              console.log(`자료 게시판 상세: ${id}`);
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
  searchContainer: {},
  searchHeaderContainer: {
    flexDirection: "row",
    zIndex: 10,
    alignItems: "center",
    gap: 8,
  },
  searchHeaderImage: {
    width: 120,
    height: 180,
  },
  searchHeaderInputContainer: {
    marginTop: -40,
    zIndex: 10,
  },
});
