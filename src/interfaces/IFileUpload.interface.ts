export interface IFileUploadProps {
  file: File;
  id: string;
  name: string;
  readableSize: string;
  previewURL: string;
  progress: number;
  uploaded: boolean;
  error: boolean;
  url: string;
  deleteHash?: string;
}
