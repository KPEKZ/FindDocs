import { IDocument } from "./document";

export type DocumentCreateDto = Omit<IDocument, 'id'>;
