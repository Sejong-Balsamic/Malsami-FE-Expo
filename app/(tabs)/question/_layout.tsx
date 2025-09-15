import { Stack } from "expo-router";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";

export default function QuestionLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => (
            <View style={styles.headerLeftContainer}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require("@/assets/images/logo/malsamiLogo.jpeg")}
              />
              <Text style={styles.logoText}>malsami</Text>
            </View>
          ),
          headerRight: () => <Fontisto name="bell" size={24} color="black" />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 24,
    height: 24,
  },
  logoText: {
    fontSize: 24,
  },
});
