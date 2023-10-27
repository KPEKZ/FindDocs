import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DocumentsState } from "../models/documents.state";
import { DocumentId } from "../models/document";

export const documentsFeatureStoreName = 'documents';

const selectDocumentsState = createFeatureSelector<DocumentsState>(documentsFeatureStoreName);

export const documentsSelectors = {

    selectDocuments: createSelector(selectDocumentsState, ({documents}) => documents),

    selectDocumentById: (id: DocumentId) => createSelector(selectDocumentsState, ({documents}) => documents.find(d => d.id === id)),

};
