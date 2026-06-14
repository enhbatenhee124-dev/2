export interface Material {
  id: number;
  title: string;
  fileUrl: string;
  fileType?: string | null;
  classGroupId: number;
  uploadedById: number;
  createdAt?: Date;
}
