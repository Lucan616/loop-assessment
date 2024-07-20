import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Box,
  Breadcrumbs,
  Container,
  Divider,
  Link as MUILink,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { getArtist, getArtistAlbums, getArtistTopTracks } from "@/lib/data";
import AlbumCard from "@/components/album-card";

export default async function ArtistPage({ params }: { params: { id: string } }) {
  const artist = await getArtist(params.id);
  const tracksResult = await getArtistTopTracks(params.id, { limit: 6 });
  const albumsResult = await getArtistAlbums(params.id);

  if ("error" in artist && artist.error.code === 800) {
    notFound();
  } else if ("error" in artist || "error" in tracksResult || "error" in albumsResult) {
    throw new Error("Failed to load artist data.");
  }

  return (
    <Container sx={{ py: 2.5 }}>
      <Breadcrumbs sx={{ mb: 2.5 }}>
        <MUILink
          component={Link}
          href="/"
          color="inherit"
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <ChevronLeftIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Discover Artists
        </MUILink>
        <Typography color="text.primary">{artist.name}</Typography>
      </Breadcrumbs>

      {/* Top of artist page */}
      <Box sx={{ display: "flex", alignItems: "start", gap: 4 }}>
        {/* Artist cover */}
        <Paper
          sx={{
            flex: "0 0 auto",
            position: "relative",
            aspectRatio: "1",
            width: 400,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img src={artist.picture_big} alt={artist.name} style={{ width: "100%" }} />
          {/* ⬇️ Removed - Vercel image optimization limit reached */}
          {/* <Image
            src={artist.picture_big}
            alt={artist.name}
            quality={100}
            width={400}
            height={400}
            priority
          /> */}
        </Paper>
        <Box sx={{ flexGrow: 1, py: 3 }}>
          <Box sx={{ mb: 2 }}>
            {/* Artist name */}
            <Typography
              title={artist.name}
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: "4rem",
                lineHeight: 1,
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
              }}
            >
              {artist.name}
            </Typography>
            {/* Fans count */}
            <Tooltip
              title="Fans count"
              placement="right"
              arrow
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -5],
                      },
                    },
                  ],
                },
              }}
            >
              <Typography>
                <CelebrationIcon fontSize="inherit" sx={{ mr: 1 }} />
                {artist.nb_fan}
              </Typography>
            </Tooltip>
          </Box>
          {/* Top songs */}
          <Typography variant="h6" gutterBottom>
            Top Songs
          </Typography>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 4 }}
          >
            {tracksResult.data.map((track) => (
              <Box
                key={track.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  borderTop: 1,
                  borderTopColor: "divider",
                  p: 1,
                }}
              >
                <img
                  src={track.album.cover_small}
                  alt={track.album.title}
                  style={{ width: 50, height: 50, borderRadius: 4 }}
                />
                {/* ⬇️ Removed - Vercel image optimization limit reached */}
                {/* <Image
                  src={track.album.cover_small}
                  alt={track.album.title}
                  width={50}
                  height={50}
                  style={{ borderRadius: "4px" }}
                /> */}
                <Box>
                  <Typography
                    title={track.title}
                    gutterBottom
                    sx={{
                      lineHeight: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "1",
                    }}
                  >
                    {track.title}
                  </Typography>
                  <Typography
                    title={track.album.title}
                    variant="caption"
                    sx={{
                      lineHeight: 1,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: "1",
                    }}
                  >
                    {track.album.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Albums */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Albums</Typography>
        <Divider sx={{ mb: 3 }} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gridAutoRows: "minmax(0, 1fr)",
            gap: 2.5,
          }}
        >
          {albumsResult.data
            // Sort albums by release data from latest to oldest
            .sort(
              (a, b) =>
                new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
            )
            .map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
        </Box>
      </Box>
    </Container>
  );
}
