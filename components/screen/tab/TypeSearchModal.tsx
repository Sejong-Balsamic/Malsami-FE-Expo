import React, { useRef, useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import TypeSearchInput from "./TypeSearchInput";
import { colors } from "@/constants";
import { FlatList } from "react-native";
import RecentSearchTags from "./RecentSearchTags";

interface TypeSearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  type: "document" | "question";
}

const recentSearchTags = [
  "플렉시테리언",
  "오보 베지테리언",
  "페스코 베지테리언",
  "비건",
];

function TypeSearchModal({
  visible,
  onClose,
  onSearch,
  placeholder = "과목명, 키워드 등을 입력하세요",
  type = "document",
}: TypeSearchModalProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textInputRef = useRef<TextInput>(null);

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
          />
        </View>
        <View style={styles.recentSearchContainer}>
          <Text style={styles.recentSearchTitle}>최근 검색어</Text>
          <FlatList
            style={styles.recentSearchList}
            data={recentSearchTags}
            renderItem={({ item }) => <RecentSearchTags tagName={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
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
});

export default TypeSearchModal;
