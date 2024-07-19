import { render, screen } from "@testing-library/react";
import ArtistCard from "@/components/artist-card";

describe("ArtistCard", () => {
  const testArtist = {
    id: 689,
    name: "TOOL",
    nb_fan: 436409,
    picture_big:
      "https://e-cdns-images.dzcdn.net/images/artist/4b44a5f85c132844a16417dfa361c3b3/500x500-000000-80-0-0.jpg",
  };

  it("renders", () => {
    render(<ArtistCard artist={testArtist} />);

    const artistLink = screen.getByRole("link");
    const artistName = screen.getByText(testArtist.name);
    const artistPicture = screen.getByAltText(testArtist.name);
    const artistFanCount = screen.getByText(testArtist.nb_fan);

    expect(artistLink).toBeInTheDocument();
    expect(artistName).toBeInTheDocument();
    expect(artistFanCount).toBeInTheDocument();
    expect(artistPicture).toBeInTheDocument();
  });
});
