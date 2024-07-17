"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  type SvgIconTypeMap,
} from "@mui/material";
import type { OverridableComponent } from "@mui/material/OverridableComponent";

type LinkItem = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  label: string;
  href: string;
};

type NavProps = {
  links: Record<string, LinkItem[]>;
};

export default function Nav({ links }: NavProps) {
  const pathname = usePathname();

  return (
    <List component="nav" subheader={<li />} sx={{ "& ul": { padding: 0, px: 1 } }}>
      {Object.entries(links).map(([label, items]) => (
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
  );
}
