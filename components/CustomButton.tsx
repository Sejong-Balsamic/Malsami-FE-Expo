import React from "react";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "@/constants";

interface CustomButtonProps extends PressableProps {
  buttonText: string;
  size?: "large" | "medium";
}

function CustomButton({
  buttonText,
  size = "large",
  onPress,
}: CustomButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={colors.PRIMARY_GRADIENT}
        style={[styles.buttonContainer, styles[size]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 19,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.UNCHANGED_WHITE,
    fontSize: 18,
    fontWeight: "700",
  },
  large: {
    width: "100%",
    paddingVertical: 19,
    paddingHorizontal: 24,
  },
  medium: {
    width: "45%",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});

export default CustomButton;
