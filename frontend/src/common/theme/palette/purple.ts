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
  lighter: '#EDE7F6',
  light: '#B39DDB',
  main: '#5D16A6',
  dark: '#4A1185',
  darker: '#3A0D6A',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#F3E5F5',
  light: '#CE93D8',
  main: '#9683EC',
  dark: '#7A6BC5',
  darker: '#5E53A0',
  contrastText: '#fff',
};

const INFO = {
  lighter: '#FEF5E7',
  light: '#FDD49E',
  main: '#F7B801',
  dark: '#D69E01',
  darker: '#B58501',
  contrastText: GREY[800],
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
  main: '#F18701', // Updated to your desired orange
  dark: '#D66F01', // Darker shade of #F18701
  darker: '#B85901', // Even darker shade
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#F35B04', // Updated to your desired red-orange
  dark: '#D94A03', // Darker shade of #F35B04
  darker: '#B83C02', // Even darker shade
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