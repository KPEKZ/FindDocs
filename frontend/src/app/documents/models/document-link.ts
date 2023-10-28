import { Brand } from "@core/models/brand"

export type DocumentLinkId = Brand<string, 'document-link-idd'>;

export type DocumentLinkUrl = Brand<string, 'document-link-url'>;

export interface IDocumentLink {
    id: DocumentLinkId;
    url: DocumentLinkUrl;
}
