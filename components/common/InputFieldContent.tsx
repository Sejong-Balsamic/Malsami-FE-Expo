import React from "react";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  TextInputProps,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants/colors";

interface InputFieldContentProps extends TextInputProps {
  placeholderText?: string;
  inputValue: string;
  onFocus: (e: any) => void;
  onBlur: (e: any) => void;
  onChangeText: (text: string) => void;
  onClear: () => void;
  type: "search" | "login";
  textInputRef: React.RefObject<TextInput | null>;
}

export default function InputFieldContent({
  placeholderText,
  inputValue,
  onFocus,
  onBlur,
  onChangeText,
  onClear,
  type,
  textInputRef,
  ...props
}: InputFieldContentProps) {
  return (
    <>
      <View style={styles.inputRow}>
        <TextInput
          ref={textInputRef}
          placeholder={placeholderText}
          {...props}
          value={inputValue}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          style={styles.textInput}
        />
        {inputValue !== "" && (
          <Pressable onPress={onClear} hitSlop={8}>
            <Feather name="x" size={20} color={colors.PRIMARY_COLOR} />
          </Pressable>
        )}
      </View>
      {type === "search" && (
        <EvilIcons name="search" size={32} color={colors.PRIMARY_COLOR} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
