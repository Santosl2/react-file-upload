import { FileUpload } from "../../components/FileUpload";
import { Container, Content } from "./styles";
import { FilesList } from "../../components/FilesList";
import { useEffect, useState } from "react";
import filesize from "filesize";
import { v4 as uuid } from "uuid";
import { IFileUploadProps } from "../../interfaces/IFileUpload.interface";
import { api } from "../../services/api";

export function Upload() {
  const [uploadedFiles, setUploadedFiles] = useState<IFileUploadProps[]>([]);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const filesNotUploaded = uploadedFiles.filter(
        (notUploadedFile) => !notUploadedFile.uploaded
      );
      filesNotUploaded.forEach(allProcessUpload);
    }

    return () => {
      uploadedFiles.forEach((file) => URL.revokeObjectURL(file.previewURL));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFiles.length]);

  function handleUpload(files?: File[]): void {
    if (!files) return;

    const filesUploaded = files.map((file) => ({
      file,
      id: uuid(),
      name: file.name,
      readableSize: filesize(file.size),
      previewURL: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: "",
    }));

    setUploadedFiles((prev) => prev.concat(filesUploaded));
  }

  function updateProgressFiles(id: string = "", payload: any): void {
    const newUploadedFiles = uploadedFiles.map((file) => {
      return id === file.id ? { ...file, ...payload } : file;
    });

    setUploadedFiles(newUploadedFiles);
  }

  function allProcessUpload(uploadedFile: IFileUploadProps): void {
    if (uploadedFile.progress >= 100 || uploadedFile.uploaded) return;

    const data = new FormData();
    data.append("image", uploadedFile.file);

    api
      .post("3/image", data, {
        onUploadProgress: (e) => {
          const progress = Number(Math.round((e.loaded * 100) / e.total));
          updateProgressFiles(uploadedFile.id, { progress });
        },
      })
      .then((response) => {
        const {
          data: { data },
        } = response;
        updateProgressFiles(uploadedFile.id, {
          uploaded: true,
          id: data.id,
          url: data.link,
          deleteHash: data.deletehash,
        });
      })
      .catch(() => {
        updateProgressFiles(uploadedFile.id, {
          error: true,
        });
      });
  }

  function handleDelete(deleteHash: string): void {
    if (!deleteHash) return;

    const deleteHashIsId = uploadedFiles.find((file) => file.id === deleteHash);

    if (deleteHashIsId) return;

    setUploadedFiles((prev) =>
      prev.filter((fileRemove) => fileRemove.deleteHash !== deleteHash)
    );

    api.delete(`3/image/${deleteHash}`).then((response) => {});
    return;
  }

  return (
    <Container>
      <Content>
        <FileUpload onUpload={handleUpload} />
        {!!uploadedFiles.length && (
          <FilesList handleDelete={handleDelete} files={uploadedFiles} />
        )}
      </Content>
    </Container>
  );
}
