import { colors } from "@/constants";
import { AuthDto } from "@/types/responses/authDto";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/common/CustomButton";
import InputField from "@/components/common/InputField";

interface WelcomeSectionProps {
  authData: AuthDto;
  onPressLogin: () => void;
}

function WelcomeSection({ authData, onPressLogin }: WelcomeSectionProps) {
  const myData = authData;

  if (!myData.memberId) {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcomeText}>
            반가워요!{`\n`}로그인 후 이용해 주세요:)
          </Text>
        </View>
        <View style={styles.characterContainer}>
          <View style={styles.characterIcon} />
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton
            buttonText="로그인"
            size="large"
            onPress={onPressLogin}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>
          반가워요,{" "}
          <Text style={[styles.welcomeText, { color: colors.PRIMARY_COLOR }]}>
            {myData.studentName}
          </Text>
          님!
        </Text>
        <Text>궁금한 자료를 검색해 볼까요 :)</Text>
      </View>
      <View style={styles.characterContainer}>
        <View style={styles.characterIcon} />
      </View>
      <View style={styles.searchContainer}>
        <InputField type="search" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "500",
  },
  characterContainer: {
    padding: 20,
    alignItems: "flex-end",
    justifyContent: "center",
    right: 20,
    zIndex: 10,
    marginBottom: -40,
  },
  characterIcon: {
    width: 136,
    height: 136,
    backgroundColor: colors.PRIMARY_COLOR,
    borderRadius: 68,
  },
  buttonContainer: {
    zIndex: 20,
  },
  searchContainer: {
    zIndex: 20,
  },
  searchBox: {
    width: "100%",
    height: 50,
  },
});

export default WelcomeSection;
