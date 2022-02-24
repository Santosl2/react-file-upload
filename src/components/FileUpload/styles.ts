import styled, { css } from "styled-components";

const messageColors = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

interface IDropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

const dragActive = css`
  border-color: ${messageColors["success"]};
`;

const dragReject = css`
  border-color: ${messageColors["error"]};
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})<IDropContainerProps>`
  border: 1px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  ${(props) => props.isDragActive && dragActive}
  ${(props) => props.isDragReject && dragReject}

  transition: height 0.3s;
`;

interface IUploadProps {
  type?: "error" | "success" | "default";
}

export const UploadMessage = styled.div<IUploadProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => messageColors[props.type || "default"]};
  padding: 15px 0;
`;
