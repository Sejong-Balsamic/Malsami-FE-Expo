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
        {/* HOT 태그 - isPopular가 true일 때만 표시 */}
        {post?.isPopular && (
          <View style={[styles.tag, styles.hotTag]}>
            <Text style={styles.hotTagText}>HOT</Text>
          </View>
        )}

        {/* 과목 태그 */}
        {post?.subject && (
          <View style={[styles.tag, styles.subjectTag]}>
            <Text style={styles.subjectTagText}>{post.subject}</Text>
          </View>
        )}

        {/* 커스텀 태그들 */}
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
        <Text style={styles.authorName}>
          {post?.member?.studentName || "익명"}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.statItem}>
            <Ionicons name="eye-outline" size={16} color={colors.GRAY_500} />
            <Text style={styles.statText}>{post?.viewCount || 0}</Text>
          </View>
          <Text style={styles.metaText}>{formatDate(post?.createdDate)}</Text>
        </View>
      </View>

      {/* 내용 */}
      <View style={styles.contentContainer}>
        <Text style={styles.content}>{post?.content}</Text>
      </View>

      {/* 파일 섹션 - Document 타입이고 파일이 있을 때만 표시 */}
      {postType === "document" && files && files.length > 0 && (
        <View style={styles.filesContainer}>
          {files.map((file: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.fileItem}
              onPress={() => handleDownloadFile(file.fileName || "파일")}
            >
              <View style={styles.fileInfo}>
                <Ionicons
                  name="document-outline"
                  size={24}
                  color={colors.PRIMARY_DOCUMENT_COLOR}
                />
                <Text style={styles.fileName}>
                  {file.fileName || `파일 ${index + 1}`}
                </Text>
              </View>
              <Ionicons
                name="download-outline"
                size={24}
                color={colors.PRIMARY_DOCUMENT_COLOR}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* 좋아요/북마크 섹션 */}
      <View style={styles.interactionContainer}>
        <View style={styles.interactionRow}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons
              name={post?.isLiked ? "heart" : "heart-outline"}
              size={20}
              color={post?.isLiked ? "#FF4757" : colors.GRAY_500}
            />
            <Text style={styles.interactionText}>{post?.likeCount || 0}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={colors.GRAY_500}
            />
            <Text style={styles.interactionText}>
              {postType === "question"
                ? (post as any)?.answerCount || 0
                : (post as any)?.commentCount || 0}
            </Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 12,
    gap: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  hotTag: {
    backgroundColor: "#FF6723",
  },
  hotTagText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "700",
  },
  subjectTag: {
    backgroundColor: colors.PRIMARY_DOCUMENT_COLOR,
  },
  subjectTagText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 12,
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "600",
    color: colors.UNCHANGED_BLACK,
    marginBottom: 8,
    lineHeight: 24,
  },
  metaContainer: {
    marginBottom: 16,
  },
  authorName: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.GRAY_500,
    marginBottom: 4,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.UNCHANGED_BLACK,
    marginBottom: 12,
  },
  imageContainer: {
    marginBottom: 16,
  },
  imagePlaceholder: {
    width: 120,
    height: 80,
    backgroundColor: colors.GRAY_200,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    fontSize: 12,
    color: colors.GRAY_500,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.UNCHANGED_BLACK,
  },
  filesContainer: {
    marginBottom: 20,
  },
  fileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.GRAY_100,
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
    color: colors.PRIMARY_DOCUMENT_COLOR,
    flex: 1,
  },
  interactionContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.GRAY_100,
    marginBottom: 20,
  },
  interactionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  interactionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  interactionText: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
  bottomSpace: {
    height: 40,
  },
});
