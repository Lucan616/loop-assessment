import { Box, Container, Skeleton } from "@mui/material";

export default function LoadingArtistPage() {
  return (
    <Container sx={{ py: 2.5 }}>
      <Skeleton width={300} sx={{ fontSize: "1.2rem", mb: 2.5 }} />
      <Box sx={{ display: "flex", gap: 4 }}>
        <Skeleton variant="rounded" width={400} height={400} />
        <Box sx={{ flexGrow: 1, py: 3 }}>
          <Skeleton variant="text" sx={{ fontSize: "4rem", mb: -1.5 }} />
          <Skeleton variant="text" width={70} sx={{ fontSize: "1.2rem" }} />
          <Skeleton variant="text" width={100} sx={{ fontSize: "1.8rem" }} />
          <Box
            sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 4 }}
          >
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    borderTop: 1,
                    borderTopColor: "divider",
                    p: 1,
                  }}
                >
                  <Skeleton variant="rounded" width={50} height={50} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" />
                    <Skeleton variant="text" />
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
