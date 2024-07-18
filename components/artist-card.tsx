import Image from "next/image";
import Link from "next/link";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { Artist } from "@/lib/definitions";

type ArtistCardProps = { artist: Artist };

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Box
      sx={{
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Link
        href={`/artist/${artist.id}`}
        style={{ color: "inherit", textDecoration: "none" }}
      >
        {/* Artist cover */}
        <Paper
          sx={{
            position: "relative",
            aspectRatio: "1/1",
            mb: 1,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Image */}
          <Image
            src={artist.picture_big}
            alt={artist.name}
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(200, 200))}`}
            style={{ objectFit: "cover" }}
          />
          {/* Gradient overlay - to make fans count more legible */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              px: 1.5,
              py: 1,
              background:
                "linear-gradient(160deg, rgba(255,255,255,0) 70%, rgba(0,0,0,0.4) 100%)",
            }}
          >
            <Tooltip
              title="Fan count"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.8rem",
                  color: "white",
                  filter:
                    "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
                }}
              >
                <CelebrationIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                {artist.nb_fan}
              </Typography>
            </Tooltip>
          </Box>
        </Paper>
        {/* Artist name */}
        <Typography
          sx={{
            fontSize: "0.9rem",
            fontWeight: 500,
            lineHeight: 1.3,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
          }}
        >
          {artist.name}
        </Typography>
      </Link>
    </Box>
  );
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);
