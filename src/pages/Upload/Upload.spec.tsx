import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Upload } from ".";
// eslint-disable-next-line jest/no-mocks-import
import "../../__mocks__/DOM";

describe("Upload test", () => {
  it("renders correctly", () => {
    render(<Upload />);

    expect(screen.getByTestId("jest_upload")).toBeInTheDocument();
    expect(screen.getByText("Arraste arquivos aqui...")).toBeInTheDocument();
  });

  it("should be able possible to upload file", async () => {
    render(<Upload />);

    const inputEl = screen.getByTestId("input_upload");

    // Create fake FILE
    const file = new File(["file"], "test.png", {
      type: "image/png",
    });

    Object.defineProperty(inputEl, "files", {
      value: [file],
    });

    fireEvent.drop(inputEl);

    await waitFor(() =>
      expect(screen.getByText("test.png")).toBeInTheDocument()
    );
  });
});
