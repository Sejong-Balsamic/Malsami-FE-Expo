import { colors } from "@/constants";
import useModal from "@/hooks/useModal";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import TypeSearchModal from "./TypeSearchModal";

interface SearchModalBoxProps {
  type: "document" | "question";
  onPress: () => void;
}

function SearchModalBox({ type, onPress }: SearchModalBoxProps) {
  const color =
    type === "document"
      ? colors.PRIMARY_DOCUMENT_COLOR
      : colors.PRIMARY_QUESTION_COLOR;
  const {
    isVisible: showModal,
    show: openModal,
    hide: closeModal,
  } = useModal();

  return (
    <>
      <Pressable
        style={[styles.container, { borderColor: color }]}
        onPress={openModal}
      >
        <View style={styles.box}>
          <Text style={styles.placeholderText}>
            과목명, 키워드 등을 입력하세요
          </Text>
        </View>
        <Ionicons name="search-outline" size={24} color={color} />
      </Pressable>
      <TypeSearchModal type={type} visible={showModal} onClose={closeModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    gap: 12,
  },
  box: {
    flex: 1,
    height: 52,
    paddingVertical: 16,
    backgroundColor: colors.UNCHANGED_WHITE,
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.GRAY_500,
  },
});

export default SearchModalBox;
