import { colors } from "@/constants/colors";
import React, { ReactNode, useMemo, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import InputFieldContainer from "@/components/common/InputFieldContainer";
import InputFieldContent from "@/components/common/InputFieldContent";

interface InputFieldProps extends TextInputProps {
  placeholderText?: string;
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
  const textInputRef = useRef<TextInput>(null);

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

  const handleFocus = (e: any) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <InputFieldContainer isFocused={isFocused}>
        <InputFieldContent
          placeholderText={placeholderText}
          inputValue={inputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onClear={handleClear}
          type={type}
          textInputRef={textInputRef}
          {...props}
        />
      </InputFieldContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    color: colors.GRAY_500,
  },
});

export default InputField;
