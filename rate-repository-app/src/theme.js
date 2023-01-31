import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#C2D8D7',
    textSecondary: '#EDEEF0',
    primary: '#1E2E2F',
    secondary: '#41585C',
    tertiary: '#183338',
    input: '#798A8D',
    button: '#2A3D40',
    error: '#E4C7C4'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default:'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;