import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Sort from "./Sort";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Create a mock push function
const mockPush = vi.fn();

// Setup a default router mock
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(""), // Default: No query params
}));

describe("Sort Component", () => {
  beforeEach(() => {
    mockPush.mockClear(); // Clear mock calls before each test
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore original mocks after each test
  });

  it("should render the sort by button", () => {
    render(<Sort />);
    expect(screen.getByRole("button", { name: "sort by" })).toBeInTheDocument();
  });

  it("should render the dropdown menu options", async () => {
    render(<Sort />);

    const dropdownMenu = screen.getByTestId("sort-by-button");
    await userEvent.click(dropdownMenu);

    const options = [
      "None",
      "Price: Low to High",
      "Price: High to Low",
      "Brand: A-Z",
      "Brand: Z-A",
    ] as const;

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("should update the URL when an option is clicked", async () => {
    render(<Sort />);

    const dropdownMenu = screen.getByTestId("sort-by-button");
    await userEvent.click(dropdownMenu);

    const priceLowToHighOption = screen.getByText("Price: Low to High");
    await userEvent.click(priceLowToHighOption);

    expect(mockPush).toHaveBeenCalledWith("/?sortBy=price-low-to-high", {
      scroll: false,
    });
  });

  it("should highlight the selected option based on the search params", async () => {
    vi.mock("next/navigation", () => ({
      useRouter: () => ({
        push: mockPush,
        replace: vi.fn(),
        prefetch: vi.fn(),
      }),
      usePathname: () => "/",
      useSearchParams: () => new URLSearchParams("?sortBy=price-high-to-low"),
    }));

    render(<Sort />);

    const dropdownMenu = screen.getByTestId("sort-by-button");
    await userEvent.click(dropdownMenu);

    const priceHighToLowOption = screen.getByText("Price: High to Low");

    expect(priceHighToLowOption).toHaveClass("bg-blue-100 text-gray-900");
  });
});
