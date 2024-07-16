import {
  Box,
  Container,
  Divider,
  InputBase,
  Paper,
  Skeleton,
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          mb: 2,
        }}
      >
        <Typography sx={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: "600" }}>
          Discover Artists
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Input */}
          <Paper
            variant="outlined"
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0.5,
              minWidth: 400,
              borderRadius: 2,
            }}
          >
            <SearchIcon sx={{ m: 0.5 }} />
            <InputBase type="search" placeholder="Search..." sx={{ flex: 1, ml: 1 }} />
          </Paper>
          {/* List/Grid Toggle */}
          <ToggleButtonGroup exclusive aria-label="view toggle" size="small">
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewRoundedIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <TableRowsRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Divider />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoRows: "200px",
          gap: 2,
          // gridAutoRows: "400px",
          mt: 3,
        }}
      >
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} variant="rounded" width="100%" height="100%" />
          ))}
      </Box>
      {/* Diplay items
        - Default placeholder (before search)
        - Loading (pulsing tiles)
        - Artist card (results)
      */}
    </Container>
  );
}
