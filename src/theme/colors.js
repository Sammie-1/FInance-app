export const colors = {
  light: {
    primary: "#c8ee44",
    primaryHover: "#b8de34",
    text: {
      primary: "#1b212d",
      secondary: "#78778b",
      muted: "#929eae",
      white: "#ffffff",
    },
    background: {
      primary: "#ffffff",
      secondary: "#f9f9f9",
      overlay: "rgba(27, 33, 45, 0.1)",
    },
    border: {
      default: "#f2f2f2",
      focus: "#c8ee44",
      muted: "#929eae",
    },
    button: {
      secondary: "#f9f9f9",
    },
  },
  dark: {
    primary: "#c8ee44",
    primaryHover: "#b8de34",
    text: {
      primary: "#ffffff",
      secondary: "#a1a1aa",
      muted: "#71717a",
      white: "#ffffff",
    },
    background: {
      primary: "#0a0a0a",
      secondary: "#1a1a1a",
      overlay: "rgba(255, 255, 255, 0.1)",
    },
    border: {
      default: "#27272a",
      focus: "#c8ee44",
      muted: "#3f3f46",
    },
    button: {
      secondary: "#1a1a1a",
    },
  },
};

export const getCurrentTheme = () => {
  return colors.light;
};
