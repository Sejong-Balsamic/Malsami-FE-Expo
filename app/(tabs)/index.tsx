import NoticeFeedList from "@/components/feed/NoticeFeedList";
import HotDocumentFeedList from "@/components/feed/HotDocumentFeedList";
import WelcomeSection from "@/components/home/WelcomeSection";
import useAuth from "@/hooks/queries/useAuth";
import { router } from "expo-router";
import { useEffect } from "react";
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

  useEffect(() => {
    if (auth) {
      Toast.show({
        type: "success",
        text1: "로그인 성공",
        text2: `${auth.studentName}님 환영합니다.`,
        position: "top",
        topOffset: 1500,
      });
      refetchDailyDocuments();
      refetchWeeklyDocuments();
    }
  }, [auth, refetchDailyDocuments, refetchWeeklyDocuments]);

  const routeHotPostList = () => {
    router.replace("../hotpost");
  };

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
              if (!auth.memberId) {
                return show();
              }
              console.log("전체보기: 공지사항");
            }}
            onPressItem={(id) => console.log(`공지사항 상세: ${id}`)}
          />
          <HotDocumentFeedList
            onPressViewAll={() => {
              if (!auth.memberId) {
                return show();
              }
              router.push("/hotpost");
            }}
            onPressItem={(id) => console.log(`자료 상세: ${id}`)}
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
