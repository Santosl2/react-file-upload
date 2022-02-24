import { Container, FileInfo, Preview } from "./styles";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { IFileUploadProps } from "../../interfaces/IFileUpload.interface";

interface IFilesListProps {
  files: IFileUploadProps[];
  handleDelete(deleteHash: string): void;
}

export function FilesList({ files, handleDelete }: IFilesListProps) {
  return (
    <Container>
      {files.map((uploadedFiles: IFileUploadProps) => {
        return (
          <li key={uploadedFiles.id}>
            <FileInfo>
              <Preview src={uploadedFiles.previewURL}></Preview>
              <div>
                <strong>{uploadedFiles.name}</strong>
                <span>{uploadedFiles.readableSize}</span>
                {uploadedFiles.uploaded && !uploadedFiles.error && (
                  <span>
                    <button
                      onClick={() => {
                        handleDelete(
                          uploadedFiles.deleteHash || uploadedFiles.id
                        );
                      }}
                    >
                      Excluir
                    </button>
                  </span>
                )}
              </div>
            </FileInfo>

            <div>
              {!uploadedFiles.uploaded && !uploadedFiles.error && (
                <CircularProgressbar
                  styles={{
                    root: { width: 24 },
                    path: { stroke: "#7159c1" },
                  }}
                  value={uploadedFiles.progress}
                  strokeWidth={10}
                  text=""
                />
              )}

              {uploadedFiles.url && (
                <a
                  href={uploadedFiles.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>
              )}

              {uploadedFiles.uploaded && (
                <MdCheckCircle size={24} color="#78e5d5" />
              )}

              {uploadedFiles.error && <MdError size={24} color="#e57878" />}
            </div>
          </li>
        );
      })}
    </Container>
  );
}
