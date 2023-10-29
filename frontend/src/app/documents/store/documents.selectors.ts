import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentsState } from "../models/documents.state";
import { DocumentId } from "../models/document";
import { DocumentKeywordId } from "../models/document-keyword";
import { DocumentTypeId } from "../models/document-type";

export const documentsFeatureStoreName = 'documents';

const selectDocumentsState = createFeatureSelector<DocumentsState>(documentsFeatureStoreName);

export const documentsSelectors = {

    selectDocuments: createSelector(selectDocumentsState, ({documents}) => documents),

    selectDocumentById: (id: DocumentId) => createSelector(selectDocumentsState, ({documents}) => documents.find(d => d.id === id)),

    selectDocumentKeywords: createSelector(selectDocumentsState, ({documentKeywords}) => documentKeywords),

    selectDocumentKeywordById: (id: DocumentKeywordId) => createSelector(selectDocumentsState, ({documentKeywords}) => documentKeywords.find(d => d.id === id)),

    selectDocumentTypes: createSelector(selectDocumentsState, ({documentTypes}) => documentTypes),

    selectDocumentTypeById: (id: DocumentTypeId) => createSelector(selectDocumentsState, ({documentTypes}) => documentTypes.find(d => d.id === id)),

};
