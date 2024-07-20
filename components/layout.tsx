import Image from "next/image";
import { AppBar, Box, Divider, Drawer, Toolbar, Typography } from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AlbumIcon from "@mui/icons-material/Album";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import Nav from "@/components/nav";

const DRAWER_WIDTH = 240;

const DRAWER_ITEMS = {
  Discover: [
    {
      icon: RecentActorsIcon,
      label: "Artists",
      href: "/",
    },
    {
      icon: AlbumIcon,
      label: "Albums",
      href: "/albums",
    },
    {
      icon: AudiotrackIcon,
      label: "Tracks",
      href: "/tracks",
    },
  ],
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        variant="outlined"
        sx={{ zIndex: "calc(var(--mui-zIndex-drawer) + 1)" }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Deez Tunes
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
          },
        }}
      >
        <Toolbar variant="dense" />
        <Box sx={{ overflow: "auto" }}>
          <Nav links={DRAWER_ITEMS} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            px: 2,
            pb: 1,
          }}
        >
          <img src="/loop.svg" alt="Loop Logo" height={35} width={142} />
          {/* ⬇️ Removed - Vercel image optimization limit reached */}
          {/* <Image src="/loop.svg" alt="Loop Logo" height={35} width={142} priority /> */}
          <Divider sx={{ width: "100%", mt: 1 }} />
          <Typography
            variant="caption"
            sx={{
              textTransform: "uppercase",
              letterSpacing: 2,
              wordSpacing: 3,
            }}
          >
            Made by Lucan
          </Typography>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar variant="dense" />
        {children}
      </Box>
    </Box>
  );
}
