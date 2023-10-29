/* eslint-disable @ngrx/no-multiple-actions-in-effects */
/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { DocumentsAdapterService } from "../services/documents-adapter.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { documentsActions } from "./document.actions";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs";
import { DocumentCreateDto } from "../models/document-create-dto";
import { DocumentDate, DocumentId, IDocument } from "../models/document";
import { DocumentsKeywordApiService } from "../services/documents-keyword-api.service";
import { DocumentsTypeApiService } from "../services/documents-type-api.service";
import { DocumentKeywordCreateDto } from "../models/document-keyword-create-dto";
import { DocumentKeywordId, IDocumentKeyword } from "../models/document-keyword";
import { DocumentTypeCreateDto } from "../models/document-type-create-dto";
import { DocumentTypeId } from "../models/document-type";

@Injectable()
export class DocumentsEffects {
    private readonly store = inject(Store);
    private readonly documentsAdapter = inject(DocumentsAdapterService);
    private readonly documentKeywordsApi = inject(DocumentsKeywordApiService);
    private readonly documentTypesApi = inject(DocumentsTypeApiService);
    private readonly actions = inject(Actions);

    //#region documents

    public readonly importDocuments = createEffect(() => this.actions.pipe(
        ofType(documentsActions.importDocuments),
        mergeMap((prop: {documents: IDocument []}) => this.documentsAdapter.importDocuments(prop.documents).pipe(
            map(documents => documentsActions.importDocumentsSuccess({documents})),
        )),
        catchError(() => [
            documentsActions.importDocumentsFailed()
        ]),
    ));

    public readonly searchDocuments = createEffect(() => this.actions.pipe(
        ofType(documentsActions.searchDocuments),
        mergeMap((prop: {name: string}) => this.documentsAdapter.getSearchResults(prop.name).pipe(
            map(documents => documentsActions.searchDocumentsSuccess({documents})),
        )),
        catchError(() => [
            documentsActions.searchDocumentsFailed()
        ]),
    ));

    public readonly loadDocuments = createEffect(() => this.actions.pipe(
        ofType(documentsActions.loadDocuments),
        mergeMap((prop: {keywords ?: DocumentKeywordId [], types ?: DocumentTypeId [], dateFrom ?: DocumentDate, dateTo ?: DocumentDate}) => this.documentsAdapter.getDocuments(prop.keywords, prop.types, prop.dateFrom, prop.dateTo).pipe(
            map(documents => documentsActions.loadDocumentsSuccess({documents})),
        )),
        catchError(() => [
            documentsActions.loadDocumentsFailed()
        ]),
    ));

    public readonly createDocument = createEffect(() => this.actions.pipe(
        ofType(documentsActions.createDocument),
        switchMap((prop: {document: DocumentCreateDto}) => this.documentsAdapter.createDocument(prop.document).pipe(
            mergeMap(document => [
                documentsActions.createDocumentSuccess({document})
            ]),
            catchError(() => [
                documentsActions.createDocumentFailed(),
            ]),
        ))
    ));

    public readonly updateDocument = createEffect(() => this.actions.pipe(
        ofType(documentsActions.updateDocument),
        switchMap((prop: {id: DocumentId, document: DocumentCreateDto}) => this.documentsAdapter.updateDocumentById(prop.id, prop.document).pipe(
            mergeMap(document => [
                documentsActions.updateDocumentSuccess({document})
            ]),
            catchError(() => [
                documentsActions.updateDocumentFailed(),
            ]),
        ))
    ));

    public readonly deleteDocument = createEffect(() => this.actions.pipe(
        ofType(documentsActions.deleteDocument),
        switchMap((prop: {id: DocumentId}) => this.documentsAdapter.deleteDocumentById(prop.id).pipe(
            mergeMap(document => [
                documentsActions.deleteDocumentSuccess({id: prop.id})
            ]),
            catchError(() => [
                documentsActions.deleteDocumentFailed(),
            ]),
        ))
    ));

    //#endregion documents

    //#region document-keywords

    public readonly loadDocumentKeyword = createEffect(() => this.actions.pipe(
        ofType(documentsActions.loadDocumentsKeyword),
        mergeMap(() => this.documentKeywordsApi.getDocumentKeywords().pipe(
            map(keywords => documentsActions.loadDocumentsKeywordSuccess({keywords})),
        )),
        catchError(() => [
            documentsActions.loadDocumentsKeywordFailed()
        ]),
    ));

    public readonly createDocumentKeyword = createEffect(() => this.actions.pipe(
        ofType(documentsActions.createDocumentKeyword),
        switchMap((prop: {keyword: DocumentKeywordCreateDto}) => this.documentKeywordsApi.createDocumentKeyword(prop.keyword).pipe(
            mergeMap(keyword => [
                documentsActions.createDocumentKeywordSuccess({keyword})
            ]),
            catchError(() => [
                documentsActions.updateDocumentKeywordFailed(),
            ]),
        ))
    ));

    public readonly updateDocumentKeyword = createEffect(() => this.actions.pipe(
        ofType(documentsActions.updateDocumentKeyword),
        switchMap((prop: {id: DocumentKeywordId, keyword: DocumentKeywordCreateDto}) => this.documentKeywordsApi.updateDocumentKeywordById(prop.id, prop.keyword).pipe(
            mergeMap(keyword => [
                documentsActions.createDocumentKeywordSuccess({keyword})
            ]),
            catchError(() => [
                documentsActions.createDocumentKeywordFailed(),
            ]),
        ))
    ));

    public readonly deleteDocumentKeyword = createEffect(() => this.actions.pipe(
        ofType(documentsActions.deleteDocumentKeyword),
        switchMap((prop: {id: DocumentKeywordId}) => this.documentKeywordsApi.deleteDocumentKeywordById(prop.id).pipe(
            mergeMap(() => [
                documentsActions.deleteDocumentKeywordSuccess({id: prop.id})
            ]),
            catchError(() => [
                documentsActions.deleteDocumentKeywordFailed(),
            ]),
        ))
    ));

    //#endregion document-keywords

    //#region document-types

    public readonly loadDocumentsTypes = createEffect(() => this.actions.pipe(
        ofType(documentsActions.loadDocumentTypes),
        mergeMap(() => this.documentTypesApi.getDocumentTypes().pipe(
            map(documentTypes => documentsActions.loadDocumentTypesSuccess({documentTypes})),
        )),
        catchError(() => [
            documentsActions.loadDocumentTypesFailed()
        ]),
    ));

    public readonly createDocumentType = createEffect(() => this.actions.pipe(
        ofType(documentsActions.createDocumentType),
        switchMap((prop: {documentType: DocumentTypeCreateDto}) => this.documentTypesApi.createDocumentType(prop.documentType).pipe(
            mergeMap(documentType => [
                documentsActions.createDocumentTypeSuccess({documentType})
            ]),
            catchError(() => [
                documentsActions.updateDocumentTypeFailed(),
            ]),
        ))
    ));

    public readonly updateDocumentType = createEffect(() => this.actions.pipe(
        ofType(documentsActions.updateDocumentType),
        switchMap((prop: {id: DocumentTypeId, documentType: DocumentTypeCreateDto}) => this.documentTypesApi.updateDocumentTypeById(prop.id, prop.documentType).pipe(
            mergeMap(documentType => [
                documentsActions.createDocumentTypeSuccess({documentType})
            ]),
            catchError(() => [
                documentsActions.createDocumentTypeFailed(),
            ]),
        ))
    ));

    public readonly deleteDocumentType = createEffect(() => this.actions.pipe(
        ofType(documentsActions.deleteDocumentType),
        switchMap((prop: {id: DocumentTypeId}) => this.documentTypesApi.deleteDocumentTypeById(prop.id).pipe(
            mergeMap(() => [
                documentsActions.deleteDocumentTypeSuccess({id: prop.id})
            ]),
            catchError(() => [
                documentsActions.deleteDocumentTypeFailed(),
            ]),
        ))
    ));

    //#endregion document-types
}
