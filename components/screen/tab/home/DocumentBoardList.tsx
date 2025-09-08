import React, { useMemo } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import DocumentFolderIcon from "@/assets/icons/tab/home/Document-folder.svg";
import FeedListHeader from "@/components/common/FeedListHeader";
import BoardItem from "@/components/common/BoardItem";
import { useGetDocumentsFilter } from "@/hooks/queries/useGetDocuments";
import { useDocumentPostStore } from "@/store/documentPostStore";

interface DocumentBoardListProps {
  onPressViewAll?: () => void;
  onPressItem?: (id: string) => void;
}

function DocumentBoardList({
  onPressViewAll,
  onPressItem,
}: DocumentBoardListProps) {
  // API 호출 및 데이터 가져오기
  const { isLoading } = useGetDocumentsFilter();
  const { filteredDocuments } = useDocumentPostStore();

  // 최근 3개 문서만 추출
  const displayDocuments = useMemo(() => {
    if (!filteredDocuments || filteredDocuments.length === 0) return [];
    return filteredDocuments.slice(0, 3);
  }, [filteredDocuments]);

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
          icon={<DocumentFolderIcon />}
          title="자료 게시판"
          activeTab="none"
          onTabChange={() => {}}
          onPressViewAll={onPressViewAll}
        />
      </View>

      <View style={styles.documentListContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
            <Text style={styles.loadingText}>자료를 불러오는 중...</Text>
          </View>
        ) : displayDocuments.length > 0 ? (
          <View style={styles.boardContainer}>
            {displayDocuments.map((document, index) => (
              <BoardItem
                type="document"
                key={document.documentPostId}
                documentPost={document}
                position={getItemPosition(index, displayDocuments.length)}
                onPress={onPressItem}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>표시할 자료가 없습니다.</Text>
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
  documentListContainer: {
    // paddingHorizontal: 16,
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

export default DocumentBoardList;
