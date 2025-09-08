import React, { ReactNode } from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants/colors";

interface CustomInputProps extends TextInputProps {
  label?: string;
  isFocused?: boolean;
  placeholderText?: string;
  inputValue: string;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
  onChangeText: (text: string) => void;
  onClear: () => void;
  type: "search" | "login";
}

function CustomInput({
  label,
  isFocused = false,
  placeholderText,
  inputValue,
  onFocus,
  onBlur,
  onChangeText,
  onClear,
  type,
  ...props
}: CustomInputProps) {
  const handleFocus = (e: any) => {
    onFocus(e);
  };

  const handleBlur = (e: any) => {
    onBlur(e);
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
  };

  const handleClear = () => {
    onClear();
  };

  // Container 컴포넌트 로직 - isFocused에 따라 다른 컨테이너 렌더링
  const renderContainer = (children: ReactNode) => {
    if (isFocused) {
      return (
        <LinearGradient
          colors={[...colors.PRIMARY_GRADIENT]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={styles.container}>{children}</View>
        </LinearGradient>
      );
    }

    return (
      <View style={[styles.container, styles.containerBlurred]}>
        {children}
      </View>
    );
  };

  // Content 컴포넌트 로직 - TextInput과 아이콘들
  const renderContent = () => (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputRow}>
        <TextInput
          placeholder={placeholderText}
          {...props}
          value={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          style={styles.textInput}
        />
        {inputValue !== "" && (
          <Pressable onPress={handleClear} hitSlop={8}>
            <Feather name="x" size={20} color={colors.PRIMARY_COLOR} />
          </Pressable>
        )}
      </View>
      {type === "search" && (
        <EvilIcons name="search" size={32} color={colors.PRIMARY_COLOR} />
      )}
    </>
  );

  return renderContainer(renderContent());
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "medium",
    color: colors.GRAY_500,
    marginBottom: 32,
  },
  container: {
    height: 50,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    gap: 8,
    backgroundColor: "#FFF",
  },
  containerBlurred: {
    borderWidth: 1.5,
    borderColor: "#E2E2E2",
  },
  inputRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
  },
});

export default CustomInput;
