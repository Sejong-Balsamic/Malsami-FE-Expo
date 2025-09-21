import React from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import useModal from "@/hooks/useModal";
import SearchModal from "./SearchModal";

interface CustomSearchInputProps extends Omit<TextInputProps, "onPress"> {
  placeholder?: string;
  onSearchPress?: (query: string) => void; // 검색 버튼 클릭 시 호출 (선택사항)
}

function CustomSearchInput({
  placeholder = "과목명, 키워드 등을 입력하세요",
  onSearchPress,
}: CustomSearchInputProps) {
  const {
    isVisible: showModal,
    show: openModal,
    hide: closeModal,
  } = useModal();

  const handlePress = () => {
    openModal(); // 모달 열기
  };

  return (
    <>
      {/* 메인 화면 검색 입력 */}
      <Pressable onPress={handlePress}>
        <LinearGradient
          colors={[...colors.PRIMARY_GRADIENT]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.inputContainer}>
            <TextInput
              editable={false}
              placeholder={placeholder}
              style={[styles.input, styles.inputWithIcons]}
              placeholderTextColor={colors.GRAY_500}
            />

            <View style={styles.iconsContainer}>
              <View style={styles.iconButton}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color={colors.GRAY_400}
                />
              </View>
            </View>
          </View>
        </LinearGradient>
      </Pressable>

      {/* 검색 모달 */}
      <SearchModal
        visible={showModal}
        onClose={closeModal}
        onSearch={onSearchPress}
        placeholder={placeholder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.UNCHANGED_WHITE,
    borderRadius: 8,
    height: 50,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  inputWithIcons: {
    paddingRight: 8,
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
});

export default CustomSearchInput;
