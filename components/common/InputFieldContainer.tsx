import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants/colors";

interface InputFieldContainerProps {
  isFocused: boolean;
  children: ReactNode;
}

export default function InputFieldContainer({
  isFocused,
  children,
}: InputFieldContainerProps) {
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
    <View style={[styles.container, styles.containerBlurred]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 8,
    padding: 2,
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
});
