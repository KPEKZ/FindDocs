import { IDocument } from "./document";
import { DocumentKeywordId } from "./document-keyword";
import { DocumentLinkId } from "./document-link";
import { DocumentTypeId } from "./document-type";

export type DocumentCreateFormParamsDto = Omit<IDocument, 'id' | 'documentType' | 'links' | 'keywords'> & {
    documentTypeId: DocumentTypeId;
    keywordIds: DocumentKeywordId [],
    linkIds: DocumentLinkId [],
};
