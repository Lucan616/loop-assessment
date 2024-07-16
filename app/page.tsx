import {
  Container,
  InputBase,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";

export default function Home() {
  return (
    <Container sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Discover Artists
      </Typography>
      <Toolbar variant="dense" disableGutters sx={{ alignItems: "stretch", gap: 4 }}>
        {/* Search Input */}
        <Paper
          variant="outlined"
          sx={{
            flexGrow: 1,
            display: "flex",
            padding: 1,
            alignItems: "center",
            borderRadius: 2,
          }}
        >
          <SearchIcon sx={{ m: 0.5 }} />
          <InputBase
            type="search"
            placeholder="Search artists..."
            sx={{ flex: 1, ml: 1 }}
          />
        </Paper>
        {/* List/Grid Toggle */}
        <ToggleButtonGroup exclusive aria-label="view toggle">
          <ToggleButton value="list" aria-label="list view">
            <TableRowsRoundedIcon />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridViewRoundedIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Toolbar>
      {/* Diplay items
        - Default placeholder (before search)
        - Loading (pulsing tiles)
        - Artist card (results)
      */}
    </Container>
  );
}
