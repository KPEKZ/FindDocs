import { createAction, props } from "@ngrx/store";
import { DocumentId, IDocument } from "../models/document";
import { DocumentCreateDto } from "../models/document-create-dto";

export const documentsActions = {

    //#region load-documents

    loadDocuments: createAction('[Documents] Load documents'),
    loadDocumentsSuccess: createAction('[Documents] Load documents success', props<{ documents: IDocument []}>()),
    loadDocumentsFailed: createAction('[Documents] Load documents failed'),

    //#endregion load-documents

    //#region create-document

    createDocument: createAction('[Documents] Create document', props<{ document: DocumentCreateDto }>()),
    createDocumentSuccess: createAction('[Documents] Create document success', props<{ document: IDocument }>()),
    createDocumentFailed: createAction('[Documents] Create document failed'),

    //#endregion create-document

    //#region update-document

    updateDocument: createAction('[Document] Update document', props<{ id: DocumentId, document: DocumentCreateDto }>()),
    updateDocumentSuccess: createAction('[Document] Update document success', props<{ document: IDocument }>()),
    updateDocumentFailed: createAction('[Document] Update document failed'),

    //#endregion update-document

    //#region delete-document

    deleteDocument: createAction('[Document] Delete document', props<{ id: DocumentId }>()),
    deleteDocumentSuccess: createAction('[Document] Delete document success', props<{ id: DocumentId }>()),
    deleteDocumentFailed: createAction('[Document] Delete document failed'),

    //#endregion delete-document

};
