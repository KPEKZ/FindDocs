import { Brand } from "@core/models/brand"

export type DocumentTypeId = Brand<string, 'document-type-idd'>;

export type DocumentTypeName = Brand<string, 'document-type-name'>;

export interface IDocumentType {
    id: DocumentTypeId;
    name: DocumentTypeName;
}
