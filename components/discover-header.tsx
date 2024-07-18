import { Box, Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import Search from "@/components/search";

type DiscoverHeaderProps = {
  contentName: string;
};

export default function DiscoverHeader({ contentName }: DiscoverHeaderProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          columnGap: 3,
          rowGap: 2,
          flexFlow: "row wrap",
          mb: 2,
        }}
      >
        <Typography noWrap sx={{ fontSize: "2.5rem", lineHeight: 1, fontWeight: "600" }}>
          Discover {contentName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Input */}
          <Search />
          {/* List/Grid Toggle */}
          <ToggleButtonGroup exclusive aria-label="view toggle" size="small">
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewRoundedIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view" disabled>
              <TableRowsRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
    </>
  );
}
