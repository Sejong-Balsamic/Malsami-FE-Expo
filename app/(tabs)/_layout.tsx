import { Tabs } from "expo-router";
import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import { colors } from "@/constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import useModal from "@/hooks/useModal";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useAuthModal } from "@/context/AuthModalContext";
import useAuth from "@/hooks/queries/useAuth";

export default function TabLayout() {
  const logoModal = useModal();
  const { auth } = useAuth();
  const { show } = useAuthModal();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.PRIMARY_COLOR,
        tabBarInactiveTintColor: colors.light.text,
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.UNCHANGED_WHITE,
        },
      }}
      screenListeners={{
        tabPress: (e) => {
          if (!auth.memberId && e.target?.startsWith("material")) {
            e.preventDefault();
            show();
          }
          if (!auth.memberId && e.target?.startsWith("question")) {
            e.preventDefault();
            show();
          }
          if (!auth.memberId && e.target?.startsWith("mypage")) {
            e.preventDefault();
            show();
          }
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home-outline" size={24} color={color} />
          ),
          tabBarLabel: "메인",
          headerLeft: () => (
            <Pressable style={styles.headerLeftContainer}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={require("@/assets/images/logo/malsamiLogo.jpeg")}
              />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable>
              <Fontisto
                style={{ right: 12 }}
                name="bell"
                size={24}
                color={colors.PRIMARY_COLOR}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="material"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Feather name="file-text" size={24} color={color} />
          ),
          tabBarLabel: "자료",
        }}
      />
      <Tabs.Screen
        name="question"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="file-question-outline"
              size={24}
              color={color}
            />
          ),
          tabBarLabel: "질문",
        }}
      />
      <Tabs.Screen
        name="mypage"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="person" color={color} />
          ),
          tabBarLabel: "마이페이지",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    paddingHorizontal: 12,
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
