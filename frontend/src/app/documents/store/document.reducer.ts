import { Action, createReducer, on } from "@ngrx/store";
import { DocumentsState } from "../models/documents.state";
import { documentsActions } from "./document.actions";

const initialState: DocumentsState = {
    documents: [],
    documentsIsLoading: false,
    documentKeywords: [],
    documentKeywordsIsLoading: false,
    documentTypes: [],
    documentTypesIsLoading: false,
}

const reducer = createReducer<DocumentsState>(
    initialState,

    //#region documents

    on(documentsActions.loadDocuments, (state): DocumentsState => ({
        ...state,
        documentsIsLoading: true,
    })),
    on(documentsActions.loadDocumentsSuccess, (state, { documents }): DocumentsState => ({
        ...state,
        documentsIsLoading: false,
        documents,
    })),
    on(documentsActions.loadDocumentsFailed, (state): DocumentsState => ({
        ...state,
        documentsIsLoading: false,
    })),
    on(documentsActions.updateDocument, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.updateDocumentSuccess, (state, { document }): DocumentsState => ({
        ...state,
        documents: [...state.documents.filter(d => d.id !== document.id), document],
    })),
    on(documentsActions.updateDocumentFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocument, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocumentSuccess, (state, { document }): DocumentsState => ({
        ...state,
        documents: [...state.documents, document],
    })),
    on(documentsActions.createDocumentFailed, (state): DocumentsState => ({
        ...state,
        documentsIsLoading: false,
    })),
    on(documentsActions.deleteDocument, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.deleteDocumentSuccess, (state, { id }): DocumentsState => ({
        ...state,
        documents: [...state.documents.filter(d => d.id !== id)],
    })),
    on(documentsActions.deleteDocumentFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.searchDocuments, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.searchDocumentsSuccess, (state, { documents }): DocumentsState => ({
        ...state,
        documents,
    })),
    on(documentsActions.searchDocumentsFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.importDocuments, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.importDocumentsSuccess, (state, { documents }): DocumentsState => ({
        ...state,
        documents: [...state.documents, ...documents],
    })),
    on(documentsActions.importDocumentsFailed, (state): DocumentsState => ({
        ...state,
    })),

    //#endregion documents

    //#region keywords

    on(documentsActions.loadDocumentsKeyword, (state): DocumentsState => ({
        ...state,
        documentKeywordsIsLoading: true,
    })),
    on(documentsActions.loadDocumentsKeywordSuccess, (state, { keywords }): DocumentsState => ({
        ...state,
        documentKeywordsIsLoading: false,
        documentKeywords: keywords,
    })),
    on(documentsActions.loadDocumentsKeywordFailed, (state): DocumentsState => ({
        ...state,
        documentKeywordsIsLoading: false,
    })),
    on(documentsActions.updateDocumentKeyword, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.updateDocumentKeywordSuccess, (state, { keyword }): DocumentsState => ({
        ...state,
        documentKeywords: [...state.documentKeywords.filter(d => d.id !== keyword.id), keyword],
    })),
    on(documentsActions.updateDocumentKeywordFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocumentKeyword, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocumentKeywordSuccess, (state, { keyword }): DocumentsState => ({
        ...state,
        documentKeywords: [...state.documentKeywords, keyword],
    })),
    on(documentsActions.createDocumentKeywordFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.deleteDocumentKeyword, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.deleteDocumentKeywordSuccess, (state, { id }): DocumentsState => ({
        ...state,
        documentKeywords: [...state.documentKeywords.filter(d => d.id !== id)],
    })),
    on(documentsActions.deleteDocumentKeywordFailed, (state): DocumentsState => ({
        ...state,
    })),

    //#endregion keywords

    //#region document-types

    on(documentsActions.loadDocumentTypes, (state): DocumentsState => ({
        ...state,
        documentTypesIsLoading: true,
    })),
    on(documentsActions.loadDocumentTypesSuccess, (state, { documentTypes }): DocumentsState => ({
        ...state,
        documentTypesIsLoading: false,
        documentTypes,
    })),
    on(documentsActions.loadDocumentTypesFailed, (state): DocumentsState => ({
        ...state,
        documentTypesIsLoading: false,
    })),
    on(documentsActions.updateDocumentType, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.updateDocumentTypeSuccess, (state, { documentType }): DocumentsState => ({
        ...state,
        documentTypes: [...state.documentTypes.filter(d => d.id !== documentType.id), documentType],
    })),
    on(documentsActions.updateDocumentTypeFailed, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocumentType, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.createDocumentTypeSuccess, (state, { documentType }): DocumentsState => ({
        ...state,
        documentTypes: [...state.documentTypes, documentType],
    })),
    on(documentsActions.createDocumentTypeFailed, (state): DocumentsState => ({
        ...state,
        documentsIsLoading: false,
    })),
    on(documentsActions.deleteDocumentType, (state): DocumentsState => ({
        ...state,
    })),
    on(documentsActions.deleteDocumentTypeSuccess, (state, { id }): DocumentsState => ({
        ...state,
        documentTypes: [...state.documentTypes.filter(d => d.id !== id)],
    })),
    on(documentsActions.deleteDocumentTypeFailed, (state): DocumentsState => ({
        ...state,
    })),

    //#endregion document-types
);

export function documentReducer(state: DocumentsState | undefined, action: Action): DocumentsState {
    return reducer(state, action);
}
