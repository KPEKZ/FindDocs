/* eslint-disable @ngrx/prefer-effect-callback-in-block-statement */
import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { DocumentsAdapterService } from "../services/documents-adapter.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { documentsActions } from "./document.actions";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs";
import { DocumentCreateDto } from "../models/document-create-dto";
import { DocumentId } from "../models/document";

@Injectable()
export class DocumentsEffects {
    private readonly store = inject(Store);
    private readonly documentsAdapter = inject(DocumentsAdapterService);
    private readonly actions = inject(Actions);

    public readonly loadDocuments = createEffect(() => this.actions.pipe(
        ofType(documentsActions.loadDocuments),
        mergeMap(() => this.documentsAdapter.getDocuments().pipe(
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
                documentsActions.updateDocumentFailed(),
            ]),
        ))
    ));

    public readonly updateDocument = createEffect(() => this.actions.pipe(
        ofType(documentsActions.updateDocument),
        switchMap((prop: {id: DocumentId, document: DocumentCreateDto}) => this.documentsAdapter.updateDocumentById(prop.id, prop.document).pipe(
            mergeMap(document => [
                documentsActions.createDocumentSuccess({document})
            ]),
            catchError(() => [
                documentsActions.createDocumentFailed(),
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
}
