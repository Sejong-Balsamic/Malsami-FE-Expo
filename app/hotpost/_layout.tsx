import { colors } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function HotPostLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.UNCHANGED_WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "HOT 인기자료",
          headerTitleStyle: {
            color: colors.UNCHANGED_BLACK,
            fontSize: 18,
            fontWeight: "600",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <AntDesign name="left" size={24} color={colors.UNCHANGED_BLACK} />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerTitle: "자료 상세보기",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
