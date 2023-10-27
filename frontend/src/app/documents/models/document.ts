import { Brand } from "@core/models/brand";

export type DocumentId = Brand<number,'document-id'>;

export type DocumentName = Brand<string, 'document-name'>;

export type DocumentNumber = Brand<string, 'document-number'>;

export type DocumentType = Brand<string, 'document-type'>;

export type DocumentDate = Brand<string, 'document-date'>;

export type DocumentKeyword = Brand<string, 'document-keyword'>;

export type DocumentLink = Brand<string, 'document-link'>;

export interface IDocument {
    id: DocumentId;
    name: DocumentName;
    number: DocumentNumber;
    type: DocumentType;
    releaseDate: DocumentDate;
    takeEffectDate: DocumentDate;
    keywords: DocumentKeyword [];
    DocumentLinks ?: DocumentLink [];
}
