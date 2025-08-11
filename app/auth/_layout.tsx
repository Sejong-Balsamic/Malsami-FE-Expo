import { colors } from "@/constants";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function AuthLayout() {
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
          headerTitle: "로그인",
          headerTitleStyle: {
            color: colors.UNCHANGED_BLACK,
            fontSize: 18,
            fontWeight: "600",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable
              onPress={() => router.replace("/")}
              // 아이콘이 잘리지 않도록 넉넉한 터치 영역 제공
              style={{
                width: 24,
                height: 24,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="left" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
