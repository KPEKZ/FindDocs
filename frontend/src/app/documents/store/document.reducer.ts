import { Action, createReducer, on } from "@ngrx/store";
import { DocumentsState } from "../models/documents.state";
import { documentsActions } from "./document.actions";

const initialState: DocumentsState = {
    documents: [],
    documentsIsLoading: false,
}

const reducer = createReducer<DocumentsState>(
    initialState,
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
);

export function documentReducer(state: DocumentsState | undefined, action: Action): DocumentsState {
    return reducer(state, action);
}
