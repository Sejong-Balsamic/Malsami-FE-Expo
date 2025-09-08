const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const gradients = {
  PRIMARY_GRADIENT: ["#00D1F2", "#00E271"],
} as const;

const common = {
  GRAY_25: "#C5C5C5",
  GRAY_50: "#F2F3F9",
  GRAY_100: "#D9D9D9",
  GRAY_125: "#EDEDED",
  GRAY_150: "#898989",
  GRAY_200: "#0007234D",
  GRAY_400: "#0007234D",
  GRAY_500: "#898989",
  PRIMARY_COLOR: "#00D1F2",
  PRIMARY_BACKGROUND_COLOR: "#DDFBFF",
  UNCHANGED_WHITE: "#FFF",
  UNCHANGED_BLACK: "#000",
  BLUE_500: "",
  TAB_BACKGROUND: "#EDEDED",
  TAB_TEXT: "#898989",
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
