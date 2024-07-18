import AlbumCard from "@/components/album-card";
import { render, screen } from "@testing-library/react";

describe("AlbumCard", () => {
  it("renders", () => {
    const mockAlbum = {
      title: "Mock album",
      release_date: "2000-11-18",
      cover_big: "",
    };

    render(<AlbumCard album={mockAlbum} />);

    const albumCover = screen.getByAltText(mockAlbum.title);
    const albumTitle = screen.getByText(mockAlbum.title);
    const albumReleaseYear = screen.getByText("2000");

    expect(albumCover).toBeInTheDocument();
    expect(albumTitle).toBeInTheDocument();
    expect(albumReleaseYear).toBeInTheDocument();
  });
});
