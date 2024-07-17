"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedCallback } from "use-debounce";

type SearchProps = {
  placeholder?: string;
};

export default function Search({ placeholder }: SearchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 0.5,
        minWidth: 400,
        borderRadius: 2,
      }}
    >
      <SearchIcon sx={{ m: 0.5 }} />
      <InputBase
        type="search"
        placeholder={placeholder || "Search..."}
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(event) => handleSearch(event.target.value)}
        sx={{ flex: 1, ml: 1 }}
      />
    </Paper>
  );
}
