import { IDocumentKeyword } from "./document-keyword";

export type DocumentKeywordCreateDto = Omit<IDocumentKeyword, 'id'>;
