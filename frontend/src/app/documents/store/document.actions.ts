import { createAction, props } from "@ngrx/store";
import { DocumentDate, DocumentId, IDocument } from "../models/document";
import { DocumentCreateDto } from "../models/document-create-dto";
import { DocumentKeywordId, IDocumentKeyword } from "../models/document-keyword";
import { DocumentKeywordCreateDto } from "../models/document-keyword-create-dto";
import { DocumentTypeId, IDocumentType } from "../models/document-type";
import { DocumentTypeCreateDto } from "../models/document-type-create-dto";

export const documentsActions = {

    //#region load-documents

    loadDocuments: createAction('[Documents] Load documents', props<{keywords? : DocumentKeywordId [], types ?: DocumentTypeId [], dateFrom ?: DocumentDate, dateTo ?: DocumentDate}>()),
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

    //#region load-keywords

    loadDocumentsKeyword: createAction('[Documents] Load document keyword'),
    loadDocumentsKeywordSuccess: createAction('[Documents] Load document keyword success', props<{ keywords: IDocumentKeyword []}>()),
    loadDocumentsKeywordFailed: createAction('[Documents] Load document keyword failed'),

    //#endregion load-keywords

    //#region create-keyword

    createDocumentKeyword: createAction('[Documents] Create document keyword', props<{ keyword: DocumentKeywordCreateDto }>()),
    createDocumentKeywordSuccess: createAction('[Documents] Create document keyword success', props<{ keyword: IDocumentKeyword }>()),
    createDocumentKeywordFailed: createAction('[Documents] Create document keyword failed'),

    //#endregion create-keyword

    //#region update-keyword

    updateDocumentKeyword: createAction('[Document] Update document keyword', props<{ id: DocumentKeywordId, keyword: DocumentKeywordCreateDto }>()),
    updateDocumentKeywordSuccess: createAction('[Document] Update document keyword success', props<{ keyword: IDocumentKeyword }>()),
    updateDocumentKeywordFailed: createAction('[Document] Update document keyword failed'),

    //#endregion update-keyword

    //#region delete-keyword

    deleteDocumentKeyword: createAction('[Document] Delete document keyword', props<{ id: DocumentKeywordId }>()),
    deleteDocumentKeywordSuccess: createAction('[Document] Delete document keyword success', props<{ id: DocumentKeywordId }>()),
    deleteDocumentKeywordFailed: createAction('[Document] Delete document keyword failed'),

    //#endregion delete-keyword

    //#region load-documents-type

    loadDocumentTypes: createAction('[Documents] Load document types'),
    loadDocumentTypesSuccess: createAction('[Documents] Load document types success', props<{ documentTypes: IDocumentType []}>()),
    loadDocumentTypesFailed: createAction('[Documents] Load document types failed'),

    //#endregion load-documents-type

    //#region create-document-type

    createDocumentType: createAction('[Documents] Create document type', props<{ documentType: DocumentTypeCreateDto }>()),
    createDocumentTypeSuccess: createAction('[Documents] Create document type success', props<{ documentType: IDocumentType }>()),
    createDocumentTypeFailed: createAction('[Documents] Create document type failed'),

    //#endregion create-document-type

    //#region update-document-type

    updateDocumentType: createAction('[Document] Update document type', props<{ id: DocumentTypeId, documentType: DocumentTypeCreateDto }>()),
    updateDocumentTypeSuccess: createAction('[Document] Update document type success', props<{ documentType: IDocumentType }>()),
    updateDocumentTypeFailed: createAction('[Document] Update document type failed'),

    //#endregion update-document-type

    //#region delete-document-type

    deleteDocumentType: createAction('[Document] Delete document type', props<{ id: DocumentTypeId }>()),
    deleteDocumentTypeSuccess: createAction('[Document] Delete document type success', props<{ id: DocumentTypeId }>()),
    deleteDocumentTypeFailed: createAction('[Document] Delete document type failed'),

    //#endregion delete-document-type

};
