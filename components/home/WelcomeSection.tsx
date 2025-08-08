import { colors } from "@/constants";
import { AuthDto } from "@/types/responses/authDto";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WelcomeSectionProps {
  authData: AuthDto;
}

function WelcomeSection({ authData }: WelcomeSectionProps) {
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
          <View style={styles.searchBox} />
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
        <View style={styles.searchBox} />
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
    backgroundColor: colors.UNCHANGED_BLACK,
    borderWidth: 1,
  },
  searchContainer: {
    zIndex: 20,
    backgroundColor: colors.UNCHANGED_BLACK,
    borderWidth: 1,
    borderColor: colors.UNCHANGED_WHITE,
  },
  searchBox: {
    width: "100%",
    height: 50,
  },
});

export default WelcomeSection;
