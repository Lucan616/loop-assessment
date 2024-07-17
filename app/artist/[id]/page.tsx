import Link from "next/link";
import Image from "next/image";
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
  const { data: tracks } = await getArtistTopTracks(params.id, { limit: 6 });
  const { data: albums } = await getArtistAlbums(params.id);

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
        <Paper
          sx={{
            flex: "0 0 auto",
            position: "relative",
            aspectRatio: "1",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Image
            src={artist.picture_big}
            alt={artist.name}
            quality={100}
            width={400}
            height={400}
          />
        </Paper>
        <Box sx={{ flexGrow: 1, py: 3 }}>
          <Box sx={{ mb: 2 }}>
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
          <Typography variant="h6" gutterBottom>
            Top Songs
          </Typography>
          <Box
            sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 4 }}
          >
            {tracks.map((track) => (
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
                <Image
                  src={track.album.cover_small}
                  alt={track.album.title}
                  width={50}
                  height={50}
                  style={{ borderRadius: "4px" }}
                />
                <Box>
                  <Typography>{track.title}</Typography>
                  <Typography
                    variant="caption"
                    lineHeight={1}
                    sx={{
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
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
