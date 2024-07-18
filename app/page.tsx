import { Suspense } from "react";
import {
  Box,
  Container,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import { searchMusic } from "@/lib/data";
import Search from "@/components/search";
import ArtistCard from "@/components/artist-card";
import SearchPagePlaceholder from "@/components/search-page-placeholder";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";
  const { data: artists = [], error = undefined } = query
    ? await searchMusic(query, "artist")
    : {};

  return (
    <Container sx={{ py: 3 }}>
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
          Discover Artists
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Input */}
          <Search />
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
      <Divider sx={{ mb: 3 }} />
      <Suspense key={query} fallback={<>loading...</>}>
        {!query ? (
          <SearchPagePlaceholder placeholderText="Search for artists" />
        ) : artists.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gridAutoRows: "minmax(0, 1fr)",
              gap: 2.5,
            }}
          >
            {artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </Box>
        ) : (
          <Typography
            sx={{
              color: "GrayText",
              fontSize: "1.75rem",
              fontWeight: "500",
              letterSpacing: "1px",
            }}
          >
            No artists found
          </Typography>
        )}
      </Suspense>
    </Container>
  );
}
