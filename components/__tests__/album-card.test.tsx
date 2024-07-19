import { render, screen } from "@testing-library/react";
import AlbumCard from "@/components/album-card";

describe("AlbumCard", () => {
  it("renders", () => {
    const testAlbum = {
      title: "Random Access Memories (Drumless Edition)",
      release_date: "2023-11-17",
      cover_big:
        "https://e-cdns-images.dzcdn.net/images/cover/bb8b5f188ae380ac3a7c876b70556357/500x500-000000-80-0-0.jpg",
    };

    render(<AlbumCard album={testAlbum} />);

    const albumCover = screen.getByAltText(testAlbum.title);
    const albumTitle = screen.getByText(testAlbum.title);
    const albumReleaseYear = screen.getByText("2023");

    expect(albumCover).toBeInTheDocument();
    expect(albumTitle).toBeInTheDocument();
    expect(albumReleaseYear).toBeInTheDocument();
  });
});
