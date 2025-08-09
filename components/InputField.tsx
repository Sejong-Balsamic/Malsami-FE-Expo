import { colors } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { ReactNode, useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";

interface InputFieldProps extends TextInputProps {
  placeholderText: string;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
  type?: "search" | "login";
  label?: string;
}

function InputField({
  placeholderText,
  leftChild = null,
  rightChild = null,
  type = "search",
  label,
  ...props
}: InputFieldProps) {
  // Controlled vs Uncontrolled
  const isControlled = useMemo(() => props.value != null, [props.value]);
  const [uncontrolledValue, setUncontrolledValue] = useState("");
  const inputValue =
    (isControlled ? (props.value as string) : uncontrolledValue) ?? "";
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeText = (text: string) => {
    if (!isControlled) {
      setUncontrolledValue(text);
    }
    props.onChangeText?.(text);
  };

  const handleClear = () => {
    if (!isControlled) {
      setUncontrolledValue("");
    }
    props.onChangeText?.("");
  };
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      {isFocused ? (
        <LinearGradient
          colors={[...colors.PRIMARY_GRADIENT]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientBorder}
        >
          <View style={[styles.container, styles.containerFocused]}>
            {type === "search" && (
              <EvilIcons name="search" size={32} color={colors.PRIMARY_COLOR} />
            )}
            <View style={styles.inputRow}>
              <TextInput
                placeholder={placeholderText}
                {...props}
                value={inputValue}
                onFocus={(e) => {
                  setIsFocused(true);
                  props.onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  props.onBlur?.(e);
                }}
                onChangeText={handleChangeText}
                style={styles.textInput}
              />
              {inputValue !== "" && (
                <Pressable onPress={handleClear} hitSlop={8}>
                  <Feather name="x" size={20} color={colors.PRIMARY_COLOR} />
                </Pressable>
              )}
            </View>
            {rightChild}
          </View>
        </LinearGradient>
      ) : (
        <View style={[styles.container, styles.containerBlurred]}>
          {type === "search" && (
            <EvilIcons name="search" size={32} color={colors.PRIMARY_COLOR} />
          )}
          <View style={styles.inputRow}>
            <TextInput
              placeholder={placeholderText}
              {...props}
              value={inputValue}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              onChangeText={handleChangeText}
              style={styles.textInput}
            />
            {inputValue !== "" && (
              <Pressable onPress={handleClear} hitSlop={8}>
                <Feather name="x" size={20} color={colors.PRIMARY_COLOR} />
              </Pressable>
            )}
          </View>
          {rightChild}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  gradientBorder: {
    borderRadius: 8,
    padding: 2, // gradient border width
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
  containerFocused: {
    // no border here, gradient wrapper acts as border
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

export default InputField;
