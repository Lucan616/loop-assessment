import { render, screen } from "@testing-library/react";
import AppLayout from "@/components/layout";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/"),
}));

describe("AppLayout", () => {
  it("renders", () => {
    render(<AppLayout>test</AppLayout>);

    const appTitle = screen.getByText("Deez Tunes");

    expect(appTitle).toBeInTheDocument();
  });
});
