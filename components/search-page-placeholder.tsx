import { Box, Skeleton, Typography } from "@mui/material";

type SearchPagePlaceholderProps = {
  placeholderText: string;
};

export default function SearchPagePlaceholder({
  placeholderText,
}: SearchPagePlaceholderProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gridAutoRows: "200px",
        gap: 2.5,
      }}
    >
      {Array(15)
        .fill(null)
        .map((_, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: "#f1f5f9",
              width: "100%",
              height: "100%",
              borderRadius: 2,
            }}
          />
        ))}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 5%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 90%)",
        }}
      >
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "1.75rem",
            fontWeight: "500",
            letterSpacing: "1px",
          }}
        >
          {placeholderText}
        </Typography>
      </Box>
    </Box>
  );
}
