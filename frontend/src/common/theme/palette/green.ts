import CustomPalette from '@common/theme/palette/type';
import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  50: '#F3E5F5', // Light purple tint
  100: '#E1BEE7', // Very light purple
  200: '#CE93D8', // Light purple
  300: '#BA68C8', // Medium light purple
  400: '#AB47BC', // Purple
  500: '#9C27B0', // Medium purple
  600: '#8E24AA', // Medium dark purple
  700: '#7B1FA2', // Dark purple
  800: '#6A1B9A', // Very dark purple
  900: '#4A148C', // Deep purple
  A100: '#EA80FC', // Bright light purple
  A200: '#E040FB', // Bright purple
  A400: '#D500F9', // Bright dark purple
  A700: '#AA00FF', // Vivid purple
};

const PRIMARY = {
  lighter: '#EDE7F6', // Very light purple
  light: '#B39DDB', // Light purple
  main: '#673AB7', // Medium purple
  dark: '#512DA8', // Dark purple
  darker: '#311B92', // Deep purple
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F3E5F5', // Very light purple
  light: '#CE93D8', // Light purple
  main: '#9C27B0', // Medium purple
  dark: '#7B1FA2', // Dark purple
  darker: '#4A148C', // Deep purple
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E1BEE7', // Light purple
  light: '#BA68C8', // Medium light purple
  main: '#9C27B0', // Purple
  dark: '#7B1FA2', // Dark purple
  darker: '#4A148C', // Deep purple
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#C8E6C9', // Light green
  light: '#81C784', // Medium green
  main: '#4CAF50', // Green
  dark: '#388E3C', // Dark green
  darker: '#1B5E20', // Very dark green
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF8E1', // Light yellow
  light: '#FFE082', // Medium yellow
  main: '#FFC107', // Yellow
  dark: '#FFA000', // Dark yellow
  darker: '#FF8F00', // Very dark yellow
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFEBEE', // Light red
  light: '#EF9A9A', // Medium red
  main: '#F44336', // Red
  dark: '#D32F2F', // Dark red
  darker: '#B71C1C', // Very dark red
  contrastText: '#FFFFFF',
};

const palette: CustomPalette = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500],
  },
  background: {
    paper: GREY[100],
    default: GREY[50],
    neutral: GREY[200],
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default palette;