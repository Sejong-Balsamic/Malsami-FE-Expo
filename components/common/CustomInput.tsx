import React, { useState, useRef, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  Pressable,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather, Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface CustomInputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  setSecureTextEntry?: boolean;
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}

export default function CustomInput({
  label,
  placeholder,
  onFocus,
  onBlur,
  setSecureTextEntry = false,
  showClearButton = false,
  showPasswordToggle = false,
  value,
  onChangeText,
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const textInputRef = useRef<TextInput>(null);

  // value prop이 변경될 때 내부 상태 동기화
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handlePress = () => {
    textInputRef.current?.focus();
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    onChangeText?.(text);
  };

  const handleClearText = () => {
    setInputValue("");
    onChangeText?.("");
    textInputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const shouldShowClearButton = showClearButton && inputValue.length > 0;

  const shouldShowPasswordToggle = showPasswordToggle;

  const actualSecureTextEntry = setSecureTextEntry && !isPasswordVisible;

  return (
    <Pressable onPress={handlePress}>
      {label && <Text style={styles.label}>{label}</Text>}
      <LinearGradient
        colors={
          isFocused
            ? [...colors.PRIMARY_GRADIENT]
            : ["transparent", "transparent"]
        }
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradientBorder, !isFocused && styles.transparentBorder]}
      >
        <View
          style={[
            styles.inputContainer,
            isFocused ? styles.containerFocused : styles.containerBlurred,
          ]}
        >
          <TextInput
            ref={textInputRef}
            secureTextEntry={actualSecureTextEntry}
            {...props}
            value={inputValue}
            placeholder={placeholder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={handleChangeText}
            style={[
              styles.input,
              (shouldShowClearButton || shouldShowPasswordToggle) &&
                styles.inputWithIcons,
            ]}
            placeholderTextColor={colors.GRAY_500}
          />

          {/* 아이콘 컨테이너 */}
          {(shouldShowClearButton || shouldShowPasswordToggle) && (
            <View style={styles.iconsContainer}>
              {shouldShowPasswordToggle && (
                <Pressable
                  onPress={togglePasswordVisibility}
                  style={styles.iconButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.GRAY_400}
                  />
                </Pressable>
              )}
              {shouldShowClearButton && (
                <Pressable
                  onPress={handleClearText}
                  style={styles.iconButton}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Feather name="x" size={20} color={colors.GRAY_400} />
                </Pressable>
              )}
            </View>
          )}
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.GRAY_400,
    marginBottom: 12,
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
  inputFocused: {},
  inputBlurred: {},
  containerFocused: {},
  containerBlurred: {
    borderWidth: 1.5,
    borderColor: colors.GRAY_100,
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
