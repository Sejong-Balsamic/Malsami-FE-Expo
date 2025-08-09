/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const gradients = {
  PRIMARY_GRADIENT: ["#00D1F2", "#00E271"],
} as const;

const common = {
  GRAY_50: "#F2F3F9",
  GRAY_100: "#D9D9D9",
  GRAY_200: "#0007234D",
  GRAY_400: "#0007234D",
  GRAY_500: "#898989",
  PRIMARY_COLOR: "#00D1F2",
  UNCHANGED_WHITE: "#FFF",
  UNCHANGED_BLACK: "#000",
  BLUE_500: "",
};

const colors = {
  ...gradients,
  ...common,
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
} as const;

export { colors };
