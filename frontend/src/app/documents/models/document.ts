import { Brand } from "@core/models/brand";
import { IDocumentType } from "./document-type";
import { IDocumentKeyword } from "./document-keyword";
import { IDocumentLink } from "./document-link";

export type DocumentId = Brand<string,'document-id'>;

export type DocumentName = Brand<string, 'document-name'>;

export type DocumentNumber = Brand<string, 'document-number'>;

export type DocumentDate = Brand<string, 'document-date'>;

export interface IDocument {
    id: DocumentId;
    name: DocumentName;
    number: DocumentNumber;
    documentType: IDocumentType;
    releaseDate: DocumentDate;
    takeEffectDate: DocumentDate;
    keywords: IDocumentKeyword [];
    links ?: IDocumentLink [];
}
