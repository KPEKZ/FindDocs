import { Brand } from "@core/models/brand"

export type DocumentKeywordId = Brand<string, 'document-keyword-idd'>;

export type DocumentKeyWordName = Brand<string, 'document-keyword-name'>;

export interface IDocumentKeyword {
    id: DocumentKeywordId;
    name: DocumentKeyWordName;
}
