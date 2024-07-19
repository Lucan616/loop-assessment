import { render, screen } from "@testing-library/react";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import AlbumIcon from "@mui/icons-material/Album";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import Nav from "@/components/nav";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
}));

describe("Nav", () => {
  const testLinks = {
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

  it("renders", () => {
    render(<Nav links={testLinks} />);

    const listSubHeader = screen.getByText("Discover");
    const linkElements = screen.getAllByRole("link");

    expect(listSubHeader).toBeInTheDocument();
    expect(linkElements.length).toEqual(3);
  });

  it("has selected link class", () => {
    render(<Nav links={testLinks} />);

    const artistsLinkElement = screen.getByRole("link", { name: "Artists" });

    expect(artistsLinkElement).toHaveClass("Mui-selected");
  });
});
