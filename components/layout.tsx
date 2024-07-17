"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AlbumIcon from "@mui/icons-material/Album";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import LoopLogo from "@/app/loop-logo.svg";

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
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        color="inherit"
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
            // paddingBottom: 4,
          },
        }}
      >
        <Toolbar variant="dense" />
        <Box sx={{ overflow: "auto" }}>
          <List component="nav" subheader={<li />} sx={{ "& ul": { padding: 0, px: 1 } }}>
            {Object.entries(DRAWER_ITEMS).map(([label, items]) => (
              <li key={`section-${label}`}>
                <ul>
                  <ListSubheader sx={{ color: "InfoText", fontSize: "1.2rem" }}>
                    {label}
                  </ListSubheader>
                  {items.map((item) => (
                    <ListItem key={`item-${label}-${item.label}`} sx={{ py: 0.25 }}>
                      <ListItemButton
                        LinkComponent={Link}
                        href={item.href}
                        selected={
                          item.href !== "/"
                            ? pathname === item.href
                            : pathname === item.href || pathname.startsWith("/artist")
                        }
                        dense
                        sx={{ mx: -2, borderRadius: 2 }}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <item.icon />
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>
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
          <Image src={LoopLogo} alt="Loop" height={35} priority />
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
