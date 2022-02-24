import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { FileUpload } from ".";

const onUpload = jest.fn();

describe("File upload", () => {
  it("renders correctly", () => {
    render(<FileUpload onUpload={onUpload} />);

    expect(screen.getByTestId("input_upload")).toBeInTheDocument();
  });
});
