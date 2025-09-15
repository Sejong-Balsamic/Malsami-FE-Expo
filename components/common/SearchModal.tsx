import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  Pressable,
  View,
  Modal,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export default function SearchModal({
  visible,
  onClose,
  onSearch,
  placeholder = "과목명, 키워드 등을 입력하세요",
}: SearchModalProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setInputValue("");
      setIsFocused(false);
    }
  }, [visible]);

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
              {/* 뒤로가기 버튼 */}
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
          {/* TODO: 검색 결과 컴포넌트 추가 */}
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
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_100,
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
