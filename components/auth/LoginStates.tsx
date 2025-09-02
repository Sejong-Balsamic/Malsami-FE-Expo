import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "@expo/vector-icons/Feather";
import { colors } from "@/constants";
import { router } from "expo-router";

export function LoginLoadingState() {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 회전 애니메이션 - 스피너 이미지
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
        {/* 로딩 스피너 이미지 */}
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
    // 체크 아이콘 그리기 애니메이션
    const checkAnimation = Animated.timing(checkAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: false,
    });

    // 스케일 애니메이션
    const scaleAnimation = Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    });

    // 순차적으로 실행하고 완료 시 콜백 호출
    Animated.sequence([scaleAnimation, checkAnimation]).start((finished) => {
      if (finished && onAnimationComplete) {
        // 애니메이션 완료 후 1초 더 보여주고 콜백 실행
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
