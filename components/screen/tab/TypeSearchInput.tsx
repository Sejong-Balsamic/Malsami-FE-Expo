import { colors } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface TypeSearchInputProps extends TextInputProps {
  type: "document" | "question";
  onClose: () => void;
  onSearch?: (query: string) => void;
}

function TypeSearchInput({
  type,
  onClose,
  onSearch,
  placeholder = "과목명, 키워드 등을 입력하세요",
  ...props
}: TypeSearchInputProps) {
  const color =
    type === "document"
      ? colors.PRIMARY_DOCUMENT_COLOR
      : colors.PRIMARY_QUESTION_COLOR;

  const handleSearch = () => {
    const value = props.value as string;
    if (onSearch && value?.trim()) {
      onSearch(value.trim());
    }
  };

  const handleSubmitEditing = () => {
    handleSearch();
  };

  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Pressable onPress={onClose}>
        <Ionicons name="chevron-back" size={24} color={color} />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        returnKeyType="search"
        onSubmitEditing={handleSubmitEditing}
        {...props}
      />
      <Pressable onPress={handleSearch}>
        <Ionicons name="search-outline" size={24} color={color} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 52,
    borderRadius: 8,
  },
});

export default TypeSearchInput;
