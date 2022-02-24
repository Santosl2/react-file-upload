import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

interface IFileUploadProps {
  onUpload(files?: File[]): void;
}

export function FileUpload({ onUpload }: IFileUploadProps) {
  const renderErrorMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste arquivos aqui...</UploadMessage>;
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado.</UploadMessage>;
    }

    return (
      <UploadMessage type="success">Solte os arquivos aqui...</UploadMessage>
    );
  };
  return (
    <Dropzone accept="image/*" onDropAccepted={onUpload}>
      {({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
        return (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {renderErrorMessage(isDragActive, isDragReject)}
          </DropContainer>
        );
      }}
    </Dropzone>
  );
}
