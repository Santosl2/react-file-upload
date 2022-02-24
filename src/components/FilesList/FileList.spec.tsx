import { render, screen } from "@testing-library/react";
import { IFileUploadProps } from "interfaces/IFileUpload.interface";
import { FilesList } from ".";

const randomStr = [{ name: "matheusfilypedev" }];
const blob = new Blob([JSON.stringify(randomStr)]);

let fakeData: IFileUploadProps[] = [
  {
    file: new File([blob], "value.json"),
    id: "Test",
    name: "Name Test",
    readableSize: "90",
    previewURL:
      "https://camo.githubusercontent.com/f68973fd6496c5bc8efc80c750b266512666784493980dbfd4a28dfeaec1b059/68747470733a2f2f692e696d6775722e636f6d2f4e4d76536e41312e676966",
    progress: 50,
    uploaded: true,
    error: false,
    url: "https://api.imgur.com/endpoints/image",
  },
];

describe("File List test", () => {
  it("renders correctly", () => {
    render(<FilesList files={fakeData} handleDelete={() => {}} />);

    expect(screen.getByText("Excluir")).toBeTruthy();
  });

  it("preview image should appear", () => {
    render(<FilesList files={fakeData} handleDelete={() => {}} />);

    expect(screen.getByText(fakeData[0].name)).toBeTruthy();
  });
});
