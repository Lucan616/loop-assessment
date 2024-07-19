import { render, screen } from "@testing-library/react";
import SearchPagePlaceholder from "@/components/search-page-placeholder";

describe("SearchPagePlaceholder", () => {
  it("renders", () => {
    render(<SearchPagePlaceholder placeholderText="My placeholder" />);
    const placeholderText = screen.getByText("My placeholder");
    expect(placeholderText).toBeInTheDocument();
  });
});
