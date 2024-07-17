import Image from "next/image";
import { Box, Paper, Typography } from "@mui/material";
import { Album } from "@/lib/definitions";

export default function AlbumCard({
  album,
}: {
  album: Pick<Album, "title" | "release_date" | "cover_big">;
}) {
  return (
    <Box>
      <Paper
        sx={{
          position: "relative",
          aspectRatio: "1/1",
          mb: 1,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Image
          src={album.cover_big}
          alt={album.title}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          style={{ objectFit: "cover" }}
        />
      </Paper>
      <Typography
        sx={{
          fontSize: "0.9rem",
          fontWeight: 500,
          lineHeight: 1,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "2",
        }}
      >
        {album.title}
      </Typography>
      <Typography variant="caption" lineHeight={1}>
        {new Date(album.release_date).getFullYear()}
      </Typography>
    </Box>
  );
}
