import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useGetPostDetail } from "../../hooks/queries/useGetPostDetail";
import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "@/hooks/queries/useAuth";

type PostType = "document" | "question";

export default function PostDetailScreen() {
  const { id, type } = useLocalSearchParams<{
    id: string;
    type: PostType;
  }>();
  const { auth } = useAuth();

  const postDetailQuery = useGetPostDetail({
    postId: id || "",
    postType: (type as PostType) || "document",
    enabled: !!id && !!auth?.memberId,
  });

  const post = postDetailQuery.data;
  const files = (postDetailQuery as any).files;
  const isLoading = postDetailQuery.isLoading;
  const error = postDetailQuery.error;
  const postType = postDetailQuery.type;

  if (!auth?.memberId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>로그인이 필요합니다.</Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.replace("/auth")}
        >
          <Text style={styles.loginButtonText}>로그인하기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY_QUESTION_COLOR} />
        <Text style={styles.loadingText}>게시글을 불러오는 중...</Text>
      </View>
    );
  }

  if (error || !post) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#FF4757" />
        <Text style={styles.errorText}>게시글을 불러올 수 없습니다.</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => router.back()}
        >
          <Text style={styles.retryButtonText}>돌아가기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isDocument = postType === "document";

  const handleDownloadFile = (fileName: string) => {
    Alert.alert("파일 다운로드", `${fileName} 파일을 다운로드하시겠습니까?`);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 태그 섹션 */}
      <View style={styles.tagContainer}>
        {post?.subject && (
          <View style={[styles.tag, styles.subjectTag]}>
            <Text style={styles.subjectTagText}>{post.subject}</Text>
          </View>
        )}

        {/* {isDocument ? (
          <>
            {(post as any)?.documentTypes?.map(
              (docType: any, index: number) => (
                <View key={index} style={[styles.tag, styles.typeTag]}>
                  <Text style={styles.typeTagText}>{docType}</Text>
                </View>
              )
            )}
          </>
        ) : (
          <>
            {(post as any)?.questionPresetTags?.map(
              (presetTag: any, index: number) => (
                <View key={index} style={[styles.tag, styles.typeTag]}>
                  <Text style={styles.typeTagText}>{presetTag}</Text>
                </View>
              )
            )}
          </>
        )} */}

        {post?.customTags?.map((tag: string, index: number) => (
          <View key={index} style={[styles.tag, styles.customTag]}>
            <Text style={styles.customTagText}>{tag}</Text>
          </View>
        ))}
      </View>

      {/* 제목 */}
      <Text style={styles.title}>{post?.title}</Text>

      {/* 메타 정보 */}
      <View style={styles.metaContainer}>
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>
            {post?.member?.studentName || "익명"}
          </Text>
          <Text style={styles.metaText}>{formatDate(post?.createdDate)}</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color={colors.GRAY_600} />
            <Text style={styles.statText}>{post?.viewCount || 0}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="heart-outline" size={16} color={colors.GRAY_600} />
            <Text style={styles.statText}>{post?.likeCount || 0}</Text>
          </View>
          {!isDocument && (
            <View style={styles.statItem}>
              <Ionicons
                name="chatbubble-outline"
                size={16}
                color={colors.GRAY_600}
              />
              <Text style={styles.statText}>
                {(post as any)?.answerCount || 0}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* 내용 */}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post?.content}</Text>
      </View>

      {/* 파일 섹션 (Document만) */}
      {isDocument && files && files.length > 0 && (
        <View style={styles.filesContainer}>
          <Text style={styles.filesTitle}>첨부 파일</Text>
          {files.map((file: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.fileItem}
              onPress={() => handleDownloadFile(file.fileName || "파일")}
            >
              <View style={styles.fileInfo}>
                <Ionicons
                  name="document-outline"
                  size={20}
                  color={colors.PRIMARY_DOCUMENT_COLOR}
                />
                <Text style={styles.fileName}>{file.fileName}</Text>
                <Text style={styles.fileSize}>
                  {file.fileSize
                    ? `${(file.fileSize / 1024 / 1024).toFixed(1)} MB`
                    : ""}
                </Text>
              </View>
              <Ionicons
                name="download-outline"
                size={20}
                color={colors.PRIMARY_DOCUMENT_COLOR}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 액션 버튼들 */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name={post?.isLiked ? "heart" : "heart-outline"}
            size={24}
            color={post?.isLiked ? "#FF4757" : colors.GRAY_600}
          />
          <Text style={styles.actionButtonText}>좋아요</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="bookmark-outline" size={24} color={colors.GRAY_600} />
          <Text style={styles.actionButtonText}>북마크</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color={colors.GRAY_600} />
          <Text style={styles.actionButtonText}>공유</Text>
        </TouchableOpacity>
      </View>

      {/* 하단 여백 */}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.GRAY_600,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.UNCHANGED_WHITE,
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: colors.GRAY_150,
    textAlign: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  loginButton: {
    backgroundColor: colors.PRIMARY_QUESTION_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginButtonText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 16,
    fontWeight: "600",
  },
  retryButton: {
    backgroundColor: colors.GRAY_100,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: colors.GRAY_150,
    fontSize: 16,
    fontWeight: "600",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subjectTag: {
    backgroundColor: colors.PRIMARY_DOCUMENT_COLOR,
  },
  subjectTagText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "600",
  },
  typeTag: {
    backgroundColor: colors.PRIMARY_DOCUMENT_COLOR,
  },
  typeTagText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "500",
  },
  customTag: {
    backgroundColor: colors.GRAY_100,
  },
  customTagText: {
    color: colors.GRAY_500,
    fontSize: 12,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.UNCHANGED_BLACK,
    marginBottom: 16,
    lineHeight: 32,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_100,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.GRAY_150,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 14,
    color: colors.GRAY_600,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 14,
    color: colors.GRAY_600,
  },
  contentContainer: {
    marginBottom: 32,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.GRAY_150,
  },
  filesContainer: {
    marginBottom: 32,
    padding: 16,
    backgroundColor: colors.GRAY_50,
    borderRadius: 12,
  },
  filesTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.GRAY_150,
    marginBottom: 12,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 8,
    marginBottom: 8,
  },
  fileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.UNCHANGED_BLACK,
    flex: 1,
  },
  fileSize: {
    fontSize: 12,
    color: colors.GRAY_600,
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_100,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: "center",
    gap: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.GRAY_600,
    fontWeight: "500",
  },
  bottomSpace: {
    height: 40,
  },
});
