import React, { useState, useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TypeSearchInput from "./TypeSearchInput";
import { colors } from "@/constants";
import RecentSearchTags from "./RecentSearchTags";

interface TypeSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  type: "document" | "question";
}

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 10;

function TypeSearchModal({
  visible,
  onClose,
  onSearch,
  placeholder = "과목명, 키워드 등을 입력하세요",
  type = "document",
}: TypeSearchModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

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

  const saveRecentSearch = async (searchTerm: string) => {
    try {
      const trimmedTerm = searchTerm.trim();
      if (!trimmedTerm) return;

      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      let searches: string[] = stored ? JSON.parse(stored) : [];

      searches = searches.filter((item) => item !== trimmedTerm);

      searches.unshift(trimmedTerm);

      if (searches.length > MAX_RECENT_SEARCHES) {
        searches = searches.slice(0, MAX_RECENT_SEARCHES);
      }

      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
      setRecentSearches(searches);
    } catch (error) {
      console.error("Failed to save recent search:", error);
    }
  };

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
      loadRecentSearches();
    }
  }, [visible]);

  const handleSearch = async (query: string) => {
    const trimmedQuery = query.trim();
    if (onSearch && trimmedQuery) {
      await saveRecentSearch(trimmedQuery);
      onSearch(trimmedQuery);
    }
  };

  const handleRecentSearchSelect = async (searchTerm: string) => {
    setInputValue(searchTerm);
    if (onSearch) {
      await saveRecentSearch(searchTerm);
      onSearch(searchTerm);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TypeSearchInput
            type={type}
            onClose={onClose}
            value={inputValue}
            onChangeText={setInputValue}
            onSearch={handleSearch}
          />
        </View>
        <View style={styles.recentSearchContainer}>
          <Text style={styles.recentSearchTitle}>최근 검색어</Text>
          <ScrollView
            style={styles.recentSearchList}
            horizontal
            showsHorizontalScrollIndicator={false}
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
  },
  recentSearchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  recentSearchTitle: {
    fontSize: 14,
    color: colors.GRAY_500,
    marginBottom: 8,
  },
  recentSearchList: {
    paddingVertical: 12,
    gap: 8,
  },
  noRecentSearchText: {
    fontSize: 14,
    color: colors.GRAY_400,
    fontStyle: "italic",
    paddingVertical: 8,
  },
});

export default TypeSearchModal;
