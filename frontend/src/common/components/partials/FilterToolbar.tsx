import useFilter from '@common/hooks/useFilter';
import { LocationOn, Search } from '@mui/icons-material';
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  InputAdornment,
  TextField,
  Paper,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface FilterToolbarProps {
  filterItems: ReturnType<typeof useFilter>;
}

const FilterToolbar = (props: FilterToolbarProps) => {
  const {
    search,
    location,
    setSearch,
    setLocation,
  } = props.filterItems;
  return (
    <Paper sx={{ p: 1.5 }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={2}>
          <TextField
            fullWidth
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterToolbar;
