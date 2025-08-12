import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface GradientTextProps {
  text1?: string;
  linearText: string;
  text2?: string;
}

export default function GradientText({
  text1,
  linearText,
  text2,
}: GradientTextProps) {
  return (
    <View style={styles.row}>
      {text1 ? <Text style={styles.text}>{text1}</Text> : null}
      <MaskedView
        maskElement={
          <Text style={[styles.text, { backgroundColor: "transparent" }]}>
            {linearText}
          </Text>
        }
      >
        <LinearGradient
          colors={["#00D1F2", "#00E271"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.text, { opacity: 0 }]}>{linearText}</Text>
        </LinearGradient>
      </MaskedView>
      {text2 ? <Text style={styles.text}>{text2}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
