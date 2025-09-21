import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Pressable,
  View,
  Modal,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import RecentSearchTags from "../screen/tab/RecentSearchTags";
import subjects from "@/constants/subjects";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const recentSearchTags = [
  { name: "플렉시테리언" },
  { name: "오보 베지테리언" },
  { name: "페스코 베지테리언" },
  { name: "비건" },
];

export default function SearchModal({
  visible,
  onClose,
  onSearch,
  placeholder = "과목명, 키워드 등을 입력하세요",
}: SearchModalProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<string[]>([]);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setInputValue("");
      setIsFocused(false);
      setFilteredSubjects([]);
      setShowSubjectSuggestions(false);
    }
  }, [visible]);

  // @ 기호로 시작하는 과목 검색 필터링
  useEffect(() => {
    if (inputValue.startsWith("@")) {
      const searchTerm = inputValue.slice(1).toLowerCase(); // @ 제거 및 소문자 변환
      if (searchTerm.length > 0) {
        const filtered = subjects.filter((subject) =>
          subject.toLowerCase().includes(searchTerm)
        );
        // 정확도 순으로 정렬 (시작하는 것부터, 그 다음 포함하는 것)
        const sortedFiltered = filtered.sort((a, b) => {
          const aLower = a.toLowerCase();
          const bLower = b.toLowerCase();
          const aStartsWith = aLower.startsWith(searchTerm);
          const bStartsWith = bLower.startsWith(searchTerm);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;
          return a.localeCompare(b);
        });

        setFilteredSubjects(sortedFiltered.slice(0, 10)); // 최대 10개만 표시
        setShowSubjectSuggestions(true);
      } else {
        setFilteredSubjects([]);
        setShowSubjectSuggestions(true); // @ 만 입력했을 때도 빈 리스트 표시
      }
    } else {
      setFilteredSubjects([]);
      setShowSubjectSuggestions(false);
    }
  }, [inputValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
  };

  const handleClearText = () => {
    setInputValue("");
    textInputRef.current?.focus();
  };

  const handleClose = () => {
    setIsFocused(false);
    setInputValue("");
    onClose();
  };

  const handleSearch = () => {
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue.trim());
    }
    // 검색 실행 후 모달은 열린 상태로 유지 (결과 표시를 위해)
  };

  const handleSubjectSelect = (subject: string) => {
    setInputValue(subject);
    setShowSubjectSuggestions(false);
    textInputRef.current?.focus();
  };

  // 검색어 하이라이트 함수
  const highlightSearchTerm = (text: string, searchTerm: string) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) => (
      <Text
        key={index}
        style={[
          styles.suggestionText,
          part.toLowerCase() === searchTerm.toLowerCase() &&
            styles.highlightText,
        ]}
      >
        {part}
      </Text>
    ));
  };

  const shouldShowClearButton = inputValue.length > 0;
  const shouldShowSearchIcon = !shouldShowClearButton;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.modalContainer}>
        {/* 헤더 */}
        <View style={styles.modalHeader}>
          <LinearGradient
            colors={
              isFocused
                ? [...colors.PRIMARY_GRADIENT]
                : ["transparent", "transparent"]
            }
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.gradientBorder,
              !isFocused && styles.transparentBorder,
            ]}
          >
            <View
              style={[
                styles.inputContainer,
                isFocused ? styles.containerFocused : styles.containerBlurred,
              ]}
            >
              <Pressable
                onPress={handleClose}
                style={styles.backButton}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.GRAY_500}
                />
              </Pressable>

              {/* 검색 입력 */}
              <TextInput
                ref={textInputRef}
                value={inputValue}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                style={styles.input}
                placeholderTextColor={colors.GRAY_500}
                autoFocus={true}
              />

              {/* 아이콘들 */}
              <View style={styles.iconsContainer}>
                {shouldShowClearButton && (
                  <Pressable
                    onPress={handleClearText}
                    style={styles.iconButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Feather name="x" size={20} color={colors.GRAY_400} />
                  </Pressable>
                )}
                {shouldShowSearchIcon && (
                  <Pressable
                    onPress={handleSearch}
                    style={styles.iconButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="search-outline"
                      size={20}
                      color={colors.GRAY_400}
                    />
                  </Pressable>
                )}
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* 검색 결과 영역 */}
        <View style={styles.resultsContainer}>
          {showSubjectSuggestions ? (
            <>
              <Text style={styles.suggestionTitle}>교과목명 추천검색어</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.suggestionsList}
              >
                {filteredSubjects.map((subject, index) => (
                  <Pressable
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => handleSubjectSelect(subject)}
                  >
                    <Text style={styles.suggestionText}>
                      {highlightSearchTerm(subject, inputValue.slice(1))}
                    </Text>
                    <Feather
                      name="arrow-up-left"
                      size={24}
                      color={colors.GRAY_400}
                    />
                  </Pressable>
                ))}
                {filteredSubjects.length === 0 && (
                  <View style={styles.noResultsContainer}>
                    <Text style={styles.noResultsText}>
                      검색 결과가 없습니다
                    </Text>
                  </View>
                )}
              </ScrollView>
            </>
          ) : (
            <>
              <Text style={styles.recentSearchTitle}>최근 검색어</Text>
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styles.recentSearchList}
              >
                {recentSearchTags.map((tag: { name: string }) => (
                  <RecentSearchTags key={tag.name} tagName={tag.name} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 16,
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
  },
  transparentBorder: {
    padding: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 8,
    height: 52,
    overflow: "hidden",
  },
  containerFocused: {
    // 포커스 시에는 그라데이션 테두리만 사용
  },
  containerBlurred: {
    borderWidth: 1.5,
    borderColor: colors.GRAY_100,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 52,
    paddingHorizontal: 8,
    fontSize: 16,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
    gap: 8,
  },
  iconButton: {
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  recentSearchTitle: {
    fontSize: 16,
    color: colors.GRAY_500,
    marginBottom: 4,
  },
  recentSearchList: {
    paddingVertical: 8,
    gap: 8,
  },
  suggestionTitle: {
    paddingLeft: 16,
    fontSize: 14,
    color: colors.GRAY_500,
    marginBottom: 12,
  },
  suggestionsList: {
    maxHeight: 400,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 8,
    marginBottom: 8,
    // borderWidth: 1,
    // borderColor: colors.GRAY_100,
  },
  suggestionText: {
    fontSize: 16,
    color: colors.GRAY_500,
  },
  noResultsContainer: {
    paddingVertical: 20,
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 14,
    color: colors.GRAY_400,
  },
  highlightContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  highlightText: {
    // backgroundColor: colors.PRIMARY_GRADIENT[0],
    color: colors.PRIMARY_DOCUMENT_COLOR,
    fontWeight: "600",
    paddingHorizontal: 2,
    borderRadius: 2,
  },
});
