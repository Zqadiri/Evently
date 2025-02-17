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
  lighter: '#E0E0E0', // Light gray
  light: '#9E9E9E',  // Medium gray
  main: '#616161',   // Dark gray
  dark: '#424242',   // Very dark gray
  darker: '#212121', // Almost black
  contrastText: '#FFFFFF',
};

const SECONDARY = {
  lighter: '#F5F5F5', // Light gray
  light: '#E0E0E0',  // Medium gray
  main: '#757575',   // Gray
  dark: '#616161',   // Dark gray
  darker: '#424242', // Very dark gray
  contrastText: '#FFFFFF',
};

const INFO = {
  lighter: '#E3F2FD', // Light blue (muted)
  light: '#90CAF9',  // Medium blue (muted)
  main: '#2196F3',   // Blue (muted)
  dark: '#1E88E5',   // Dark blue (muted)
  darker: '#1565C0', // Very dark blue (muted)
  contrastText: '#FFFFFF',
};

const SUCCESS = {
  lighter: '#E8F5E9', // Light green (muted)
  light: '#A5D6A7',  // Medium green (muted)
  main: '#4CAF50',   // Green (muted)
  dark: '#388E3C',   // Dark green (muted)
  darker: '#1B5E20', // Very dark green (muted)
  contrastText: '#FFFFFF',
};

const WARNING = {
  lighter: '#FFF8E1', // Light yellow (muted)
  light: '#FFE082',  // Medium yellow (muted)
  main: '#FFC107',   // Yellow (muted)
  dark: '#FFA000',   // Dark yellow (muted)
  darker: '#FF8F00', // Very dark yellow (muted)
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FFEBEE', // Light red (muted)
  light: '#EF9A9A',  // Medium red (muted)
  main: '#F44336',   // Red (muted)
  dark: '#D32F2F',   // Dark red (muted)
  darker: '#B71C1C', // Very dark red (muted)
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