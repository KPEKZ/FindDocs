import { IDocumentType } from "./document-type";

export type DocumentTypeCreateDto = Omit<IDocumentType, 'id'>;
