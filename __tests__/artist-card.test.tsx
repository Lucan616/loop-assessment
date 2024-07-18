import { render, screen } from "@testing-library/react";
import ArtistCard from "@/components/artist-card";

describe("ArtistCard", () => {
  it("renders", () => {
    const mockArtist = {
      id: 1,
      name: "Mock artist",
      nb_fan: 1,
      picture_big: "",
    };

    render(<ArtistCard artist={mockArtist} />);

    const artistLink = screen.getByRole("link");
    const artistName = screen.getByText(mockArtist.name);
    const artistPicture = screen.getByAltText(mockArtist.name);
    const artistFanCount = screen.getByText(1);

    expect(artistLink).toBeInTheDocument();
    expect(artistName).toBeInTheDocument();
    expect(artistFanCount).toBeInTheDocument();
    expect(artistPicture).toBeInTheDocument();
  });
});
