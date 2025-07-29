import { colors } from "@/constants";
import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
} from "react-native";

interface AuthRouteModalProps {
  onPress: () => void;
}

function AuthRouteModal({ onPress }: AuthRouteModalProps) {
  return (
    <Modal style={styles.container}>
      <View style={styles.headerContainer}>
        <Text>로그인 필요</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text></Text>
        <Pressable style={styles.buttonContainer} onPress={onPress}>
          <Text style={styles.buttonText}>로그인 페이지로 이동</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width - 32,
  },
  headerContainer: {},
  subHeaderContainer: {},
  buttonContainer: {
    backgroundColor: colors.PRIMARY_COLOR,
  },
  buttonText: {
    fontSize: 24,
    color: colors.UNCHANGED_WHITE,
  },
});

export default AuthRouteModal;
