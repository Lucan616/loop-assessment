import { Suspense } from "react";
import { Box, Container, Typography } from "@mui/material";
import { searchMusic } from "@/lib/data";
import ArtistCard from "@/components/artist-card";
import DiscoverHeader from "@/components/discover-header";
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

  // Define page content
  function renderContent() {
    if (searchResult && "data" in searchResult) {
      const artists = searchResult.data;

      if (artists.length > 0) {
        // Display artists
        return (
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
        return (
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
    } else if (
      searchResult &&
      "error" in searchResult &&
      searchResult.error.code !== 501
    ) {
      throw searchResult.error;
    } else {
      // Search placeholder - When there is no query given
      return <SearchPagePlaceholder placeholderText="Search for artists" />;
    }
  }

  return (
    <Container sx={{ py: 3 }}>
      <DiscoverHeader contentName="Artists" />
      <Suspense key={query} fallback={<>loading...</>}>
        {renderContent()}
      </Suspense>
    </Container>
  );
}
