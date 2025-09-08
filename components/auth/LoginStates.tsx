import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants";

export function LoginLoadingState() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    rotateAnimation.start();

    return () => {
      rotateAnimation.stop();
    };
  }, [rotateAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.processingContainer}>
      <Animated.View
        style={[
          styles.loadingSpinnerContainer,
          {
            transform: [{ rotate: spin }],
          },
        ]}
      >
        <Image
          source={require("@/assets/images/loading/spinner.png")}
          style={styles.loadingSpinnerImage}
          resizeMode="contain"
        />
      </Animated.View>
      <Text style={styles.processingText}>로그인 중이에요!</Text>
      <Text style={styles.processingSubText}>잠시만 기다려주세요 :)</Text>
    </View>
  );
}

interface LoginSuccessStateProps {
  onAnimationComplete?: () => void;
}

export function LoginSuccessState({
  onAnimationComplete,
}: LoginSuccessStateProps) {
  const checkAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkAnimation = Animated.timing(checkAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    });

    const scaleAnimation = Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });

    Animated.sequence([scaleAnimation, checkAnimation]).start((finished) => {
      if (finished && onAnimationComplete) {
        setTimeout(() => {
          console.log("🎉 로그인 성공 애니메이션 완료! 라우팅 시작");
          onAnimationComplete();
        }, 1000);
      }
    });
  }, [checkAnim, scaleAnim, onAnimationComplete]);

  return (
    <View style={styles.processingContainer}>
      <Animated.View
        style={[
          styles.successIconContainer,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient
          colors={colors.PRIMARY_GRADIENT}
          style={styles.iconContainer}
        >
          <Animated.View
            style={{
              opacity: checkAnim,
            }}
          >
            <Feather name="check" size={40} color={"#fff"} />
          </Animated.View>
        </LinearGradient>
      </Animated.View>
      <Text style={styles.processingText}>로그인 완료!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  processingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "#fff",
  },
  processingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.GRAY_500,
  },
  processingSubText: {
    fontSize: 16,
    color: colors.GRAY_400,
  },
  loadingSpinnerContainer: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingSpinnerImage: {
    width: 80,
    height: 80,
  },
  successIconContainer: {
    width: 80,
    height: 80,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
