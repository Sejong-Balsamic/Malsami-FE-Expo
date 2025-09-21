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
}

function TypeSearchInput({
  type,
  onClose,
  placeholder = "과목명, 키워드 등을 입력하세요",
  ...props
}: TypeSearchInputProps) {
  const color =
    type === "document"
      ? colors.PRIMARY_DOCUMENT_COLOR
      : colors.PRIMARY_QUESTION_COLOR;
  return (
    <View style={[styles.container, { borderColor: color }]}>
      <Pressable onPress={onClose}>
        <Ionicons name="chevron-back" size={24} color={color} />
      </Pressable>
      <TextInput style={styles.input} placeholder={placeholder} {...props} />
      <Ionicons name="search-outline" size={24} color={color} />
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
