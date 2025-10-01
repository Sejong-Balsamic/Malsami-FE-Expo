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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import subjects from "@/constants/subjects";
import RecentSearchTags from "../screen/tab/RecentSearchTags";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 10;

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
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const textInputRef = useRef<TextInput>(null);

  // AsyncStorage에서 최근 검색어 불러오기
  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const searches = JSON.parse(stored);
        setRecentSearches(searches);
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    }
  };

  // AsyncStorage에 최근 검색어 저장하기
  const saveRecentSearch = async (searchTerm: string) => {
    try {
      const trimmedTerm = searchTerm.trim();
      if (!trimmedTerm) return;

      // 기존 검색어 불러오기
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      let searches: string[] = stored ? JSON.parse(stored) : [];

      // 중복 제거 (이미 있으면 제거)
      searches = searches.filter((item) => item !== trimmedTerm);

      // 맨 앞에 새 검색어 추가
      searches.unshift(trimmedTerm);

      // 최대 개수 제한
      if (searches.length > MAX_RECENT_SEARCHES) {
        searches = searches.slice(0, MAX_RECENT_SEARCHES);
      }

      // 저장
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (error) {
      console.error("Failed to save recent search:", error);
    }
  };

  // 개별 검색어 삭제
  const deleteRecentSearch = async (searchTerm: string) => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        let searches: string[] = JSON.parse(stored);
        searches = searches.filter((item) => item !== searchTerm);

        await AsyncStorage.setItem(
          RECENT_SEARCHES_KEY,
          JSON.stringify(searches)
        );
        setRecentSearches(searches);
      }
    } catch (error) {
      console.error("Failed to delete recent search:", error);
    }
  };

  useEffect(() => {
    if (visible) {
      setInputValue("");
      setIsFocused(false);
      setFilteredSubjects([]);
      setShowSubjectSuggestions(false);
      loadRecentSearches(); // 모달이 열릴 때 최근 검색어 불러오기
    }
  }, [visible]);

  useEffect(() => {
    if (inputValue.startsWith("@")) {
      const searchTerm = inputValue.slice(1).toLowerCase();
      if (searchTerm.length > 0) {
        const filtered = subjects.filter((subject) =>
          subject.toLowerCase().includes(searchTerm)
        );
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
        setShowSubjectSuggestions(true);
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

  const handleSearch = async () => {
    const trimmedValue = inputValue.trim();
    if (onSearch && trimmedValue) {
      // 검색어 저장
      await saveRecentSearch(trimmedValue);
      // 검색 실행
      onSearch(trimmedValue);
    }
    // 검색 실행 후 모달은 열린 상태로 유지 (결과 표시를 위해)
  };

  const handleSubjectSelect = (subject: string) => {
    setInputValue(subject);
    setShowSubjectSuggestions(false);
    textInputRef.current?.focus();
  };

  const handleRecentSearchSelect = async (searchTerm: string) => {
    setInputValue(searchTerm);
    if (onSearch) {
      // 최근 검색어를 다시 선택했을 때도 맨 앞으로 이동
      await saveRecentSearch(searchTerm);
      onSearch(searchTerm);
    }
  };

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

              <TextInput
                ref={textInputRef}
                value={inputValue}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChangeText={handleChangeText}
                onSubmitEditing={handleSearch}
                returnKeyType="search"
                style={styles.input}
                placeholderTextColor={colors.GRAY_500}
                autoFocus={true}
              />

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
                {recentSearches.map((searchTerm, index) => (
                  <RecentSearchTags
                    key={index}
                    tagName={searchTerm}
                    onPress={handleRecentSearchSelect}
                    onDelete={deleteRecentSearch}
                    showDeleteButton={true}
                  />
                ))}
                {recentSearches.length === 0 && (
                  <Text style={styles.noRecentSearchText}>
                    최근 검색어가 없습니다
                  </Text>
                )}
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
  noRecentSearchText: {
    fontSize: 14,
    color: colors.GRAY_400,
    fontStyle: "italic",
    paddingVertical: 8,
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
