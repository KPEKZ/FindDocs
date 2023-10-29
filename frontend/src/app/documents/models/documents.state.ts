import { IDocument } from "./document";
import { IDocumentKeyword } from "./document-keyword";
import { IDocumentType } from "./document-type";

export interface DocumentsState {
    documents: IDocument [];
    documentsIsLoading: boolean;
    documentKeywords: IDocumentKeyword [];
    documentKeywordsIsLoading: boolean;
    documentTypes: IDocumentType [];
    documentTypesIsLoading: boolean;
}
