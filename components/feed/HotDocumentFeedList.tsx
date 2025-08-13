// import React, { useCallback } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import { useDocumentPostStore } from "@/store/documentPostStore";
// import FeedItem from "@/components/FeedItem";
// import { DocumentPost } from "@/types/entities/postgres/documentPost";

// interface HotDocumentFeedListProps {
//   title?: string;
//   onPressViewAll?: () => void;
//   onPressItem?: (id: string) => void;
// }

// export default function HotDocumentFeedList({
//   title = "HOT 인기자료",
//   onPressViewAll,
//   onPressItem,
// }: HotDocumentFeedListProps) {
//   const {
//     dailyDocuments,
//     weeklyDocuments,
//     isLoading,
//     error,
//     activeTab,
//     setActiveTab,
//   } = useDocumentPostStore();

//   // 현재 활성화된 탭에 따라 데이터 선택
//   const documents = activeTab === "daily" ? dailyDocuments : weeklyDocuments;

//   // 탭 변경 처리
//   const handleTabChange = useCallback(
//     (tab: "daily" | "weekly") => {
//       setActiveTab(tab);
//     },
//     [setActiveTab]
//   );

//   // 로딩 중일 때
//   if (isLoading && !dailyDocuments && !weeklyDocuments) {
//     return (
//       <View style={styles.container}>
//         <HeaderSection title={title} onPressViewAll={onPressViewAll} />
//         <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//         </View>
//       </View>
//     );
//   }

//   // 에러 발생 시
//   if (error) {
//     return (
//       <View style={styles.container}>
//         <HeaderSection title={title} onPressViewAll={onPressViewAll} />
//         <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
//         <View style={styles.centerContainer}>
//           <Text style={styles.errorText}>
//             인기자료를 불러오는 중 오류가 발생했습니다.
//           </Text>
//         </View>
//       </View>
//     );
//   }

//   // 데이터가 없을 때
//   if (!documents?.length) {
//     return (
//       <View style={styles.container}>
//         <HeaderSection title={title} onPressViewAll={onPressViewAll} />
//         <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
//         <View style={styles.centerContainer}>
//           <Text style={styles.emptyText}>인기 자료가 없습니다.</Text>
//         </View>
//       </View>
//     );
//   }

//   // 아이템 렌더링
//   const renderItem = ({ item }: { item: DocumentPost }) => {
//     return (
//       <FeedItem type="document" documentPost={item} onPress={onPressItem} />
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerWithTabContainer}>
//         <HeaderSection title={title} onPressViewAll={onPressViewAll} />
//         <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
//       </View>
//       <FlatList
//         data={documents}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.documentPostId || String(Math.random())}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// }

// // 헤더 섹션 컴포넌트
// function HeaderSection({
//   title,
//   onPressViewAll,
// }: {
//   title: string;
//   onPressViewAll?: () => void;
// }) {
//   return (
//     <View style={styles.headerContainer}>
//       <View style={styles.headerTitleContainer}>
//         <Text style={styles.hotIcon}>🔥</Text>
//         <Text style={styles.headerTitle}>{title}</Text>
//       </View>
//       {onPressViewAll && (
//         <TouchableOpacity onPress={onPressViewAll}>
//           <Text style={styles.viewAllText}>전체보기</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// }

// // 탭 버튼 컴포넌트
// function TabButtons({
//   activeTab,
//   onTabChange,
// }: {
//   activeTab: "daily" | "weekly";
//   onTabChange: (tab: "daily" | "weekly") => void;
// }) {
//   return (
//     <View style={styles.tabContainer}>
//       <TouchableOpacity
//         style={[styles.tabButton, activeTab === "daily" && styles.activeTab]}
//         onPress={() => onTabChange("daily")}
//       >
//         <Text
//           style={activeTab === "daily" ? styles.activeTabText : styles.tabText}
//         >
//           일간
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.tabButton, activeTab === "weekly" && styles.activeTab]}
//         onPress={() => onTabChange("weekly")}
//       >
//         <Text
//           style={activeTab === "weekly" ? styles.activeTabText : styles.tabText}
//         >
//           주간
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import React, { useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDocumentPostStore } from "@/store/documentPostStore";
import FeedItem from "@/components/FeedItem";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import {
  useGetDailyDocuments,
  useGetWeeklyDocuments,
} from "@/hooks/queries/useGetDocuments";

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
  // Zustand에서 상태 가져오기
  const { dailyDocuments, weeklyDocuments, activeTab, setActiveTab } =
    useDocumentPostStore();

  // 각 탭에 대한 쿼리 훅 사용
  const dailyQuery = useGetDailyDocuments();
  const weeklyQuery = useGetWeeklyDocuments();

  // 현재 선택된 탭에 따라 데이터와 상태 선택
  const documents = activeTab === "daily" ? dailyDocuments : weeklyDocuments;
  const isLoading =
    activeTab === "daily" ? dailyQuery.isLoading : weeklyQuery.isLoading;
  const error = activeTab === "daily" ? dailyQuery.error : weeklyQuery.error;

  // 탭 변경 처리
  const handleTabChange = useCallback(
    (tab: "daily" | "weekly") => {
      setActiveTab(tab);
    },
    [setActiveTab]
  );

  // 로딩 중일 때
  if (isLoading && !documents) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </View>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>
            인기자료를 불러오는 중 오류가 발생했습니다.
          </Text>
        </View>
      </View>
    );
  }

  // 데이터가 없을 때
  if (!documents || documents.length === 0) {
    return (
      <View style={styles.container}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {activeTab === "daily" ? "일간 " : "주간 "}인기 자료가 없습니다.
          </Text>
        </View>
      </View>
    );
  }

  // 아이템 렌더링
  const renderItem = ({ item }: { item: DocumentPost }) => {
    return (
      <FeedItem type="document" documentPost={item} onPress={onPressItem} />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWithTabContainer}>
        <HeaderSection title={title} onPressViewAll={onPressViewAll} />
        <TabButtons activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.documentPostId || String(Math.random())}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

// 헤더 섹션 컴포넌트
function HeaderSection({
  title,
  onPressViewAll,
}: {
  title: string;
  onPressViewAll?: () => void;
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTitleContainer}>
        <Text style={styles.hotIcon}>🔥</Text>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      {onPressViewAll && (
        <TouchableOpacity onPress={onPressViewAll}>
          <Text style={styles.viewAllText}>전체보기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// 탭 버튼 컴포넌트
function TabButtons({
  activeTab,
  onTabChange,
}: {
  activeTab: "daily" | "weekly";
  onTabChange: (tab: "daily" | "weekly") => void;
}) {
  return (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "daily" && styles.activeTab]}
        onPress={() => onTabChange("daily")}
      >
        <Text
          style={activeTab === "daily" ? styles.activeTabText : styles.tabText}
        >
          일간
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === "weekly" && styles.activeTab]}
        onPress={() => onTabChange("weekly")}
      >
        <Text
          style={activeTab === "weekly" ? styles.activeTabText : styles.tabText}
        >
          주간
        </Text>
      </TouchableOpacity>
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  hotIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#EAEAEA",
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 4,
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
