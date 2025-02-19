import CustomPalette from '@common/theme/palette/type';
import { alpha } from '@mui/material/styles';

const GREY = {
  0: '#FFFFFF',
  50: '#F9FAFB',
  100: '#F2F2F2',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  A100: '#D0D7DC',
  A200: '#A1AEBD',
  A400: '#657487',
  A700: '#455463',
};

const PRIMARY = {
  lighter: '#EDE7F6', // Very light purple
  light: '#B39DDB', // Light purple
  main: '#673AB7', // Medium purple
  dark: '#512DA8', // Dark purple
  darker: '#311B92', // Deep purple
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#F3E5F5', // Very light purple
  light: '#CE93D8', // Light purple
  main: '#9C27B0', // Medium purple
  dark: '#7B1FA2', // Dark purple
  darker: '#4A148C', // Deep purple
  contrastText: '#fff',
};

const INFO = {
  lighter: '#E1BEE7', // Light purple
  light: '#BA68C8', // Medium light purple
  main: '#9C27B0', // Purple
  dark: '#7B1FA2', // Dark purple
  darker: '#4A148C', // Deep purple
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800],
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
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
    paper: '#fff',
    default: GREY[100],
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