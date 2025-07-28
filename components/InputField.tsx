import { colors } from "@/constants/colors";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { ReactNode, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface InputFieldProps extends TextInputProps {
  placeHolderValue: string;
  leftChild?: ReactNode;
  rightChild?: ReactNode;
  type?: "search" | "login";
}

function InputField({
  placeHolderValue,
  leftChild = null,
  rightChild = null,
  type = "search",
  ...props
}: InputFieldProps) {
  const [value, setValue] = useState("");
  return (
    <View style={styles.container}>
      {type === "search" && (
        <EvilIcons name="search" size={32} color={colors.PRIMARY_COLOR} />
      )}
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder={placeHolderValue}
          {...props}
          value={value}
          onChangeText={(text) => setValue(text)}
        />
        {value !== "" && (
          <Pressable onPress={() => setValue("")}>
            <Feather name="x" size={24} color={colors.PRIMARY_COLOR} />
          </Pressable>
        )}
      </View>
      {rightChild}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.PRIMARY_COLOR,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    paddingHorizontal: 12,
    gap: 8,
  },
});

export default InputField;
