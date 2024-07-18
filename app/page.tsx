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
  const searchResult = query ? await searchMusic(query, "artist") : null;
  let pageContent: JSX.Element;

  // Define page content
  if (searchResult && "data" in searchResult) {
    const artists = searchResult.data;

    if (artists.length > 0) {
      // Display artists
      pageContent = (
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
      );
    } else {
      // When no artists match search query
      pageContent = (
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
      );
    }
  } else if (searchResult && "error" in searchResult && searchResult.error.code !== 501) {
    throw searchResult.error;
  } else {
    // Search placeholder - When there is no query given
    pageContent = <SearchPagePlaceholder placeholderText="Search for artists" />;
  }

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
            <ToggleButton value="list" aria-label="list view" disabled>
              <TableRowsRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Suspense key={query} fallback={<>loading...</>}>
        {pageContent}
      </Suspense>
    </Container>
  );
}
