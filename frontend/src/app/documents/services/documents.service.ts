import { Injectable, inject } from '@angular/core';
import { DocumentsRepositoryService } from './documents-repository.service';
import { BehaviorSubject, Observable, filter, switchMap } from 'rxjs';
import { DocumentId, IDocument } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { DocumentFilterParams } from '../models/document-filter-params';
import { DocumentsKeywordRepositoryService } from './documents-keyword-repository.service';
import { DocumentsTypeRepositoryService } from './documents-type-repository.service';
import { DocumentKeywordId, IDocumentKeyword } from '../models/document-keyword';
import { DocumentKeywordCreateDto } from '../models/document-keyword-create-dto';
import { DocumentTypeId, IDocumentType } from '../models/document-type';
import { DocumentTypeCreateDto } from '../models/document-type-create-dto';
import { isNotNill } from '@core/utils/is-not-nill';

@Injectable()
export class DocumentsService {

    private readonly documentsRepository = inject(DocumentsRepositoryService);

    private readonly documentKeywordsRepository = inject(DocumentsKeywordRepositoryService);

    private readonly documentTypesRepository = inject(DocumentsTypeRepositoryService);

    private readonly documentsFilterFormValues$ = new BehaviorSubject<Partial<DocumentFilterParams> | null>(null);

    private readonly editingDocumentState$ = new BehaviorSubject<IDocument | null>(null);

    public readonly editingDocument$ = this.editingDocumentState$.asObservable().pipe(
        filter(isNotNill),
        switchMap(d => this.documentsRepository.getDocumentById(d.id)),
        shareReplayOneRefCount(),
    );

    public get editingDocument(): IDocument | null {
        return this.editingDocumentState$.value;
    }

    public set editingDocument(value: IDocument | null) {
        this.editingDocumentState$.next(value);
    }

    public readonly filterFormValues$ = this.documentsFilterFormValues$.asObservable().pipe(
        shareReplayOneRefCount(),
    );

    public get filterFormValues(): Partial<DocumentFilterParams> | null {
        return this.documentsFilterFormValues$.value;
    }

    public set filterFormValues(values: Partial<DocumentFilterParams> | null) {
        this.documentsFilterFormValues$.next(values);
    }

    //#region documents

    public readonly documents$ = this.documentsRepository.getDocuments().pipe(
        shareReplayOneRefCount(),
    );

    public getDocumentById(id: DocumentId): Observable<IDocument> {
        return this.documentsRepository.getDocumentById(id);
    }

    public createDocument(document: DocumentCreateDto): void {
        this.documentsRepository.createDocument(document);
    }

    public updateDocumentById(id: DocumentId, document: DocumentCreateDto): void {
       this.documentsRepository.updateDocumentById(id, document);
    }

    public deleteDocumentById(id: DocumentId): void {
        this.documentsRepository.deleteDocumentById(id);
    }

    //#endregion documents


    //#region document-keywords


    public readonly documentKeywords$ = this.documentKeywordsRepository.getDocumentKeywords().pipe(
        shareReplayOneRefCount(),
    );

    public getDocumentKeywordById(id: DocumentKeywordId): Observable<IDocumentKeyword> {
        return this.documentKeywordsRepository.getDocumentKeywordById(id);
    }

    public createDocumentKeyword(keyword: DocumentKeywordCreateDto): void {
        this.documentKeywordsRepository.createDocumentKeyword(keyword);
    }

    public updateDocumentKeywordById(id: DocumentKeywordId, keyword: DocumentKeywordCreateDto): void {
       this.documentKeywordsRepository.updateDocumentKeywordById(id, keyword);
    }

    public deleteDocumentKeywordById(id: DocumentKeywordId): void {
        this.documentKeywordsRepository.deleteDocumentKeywordById(id);
    }

    //#endregion document-keywords

    //#region document-types

    public readonly documentTypes$ = this.documentTypesRepository.getDocumentTypes().pipe(
        shareReplayOneRefCount(),
    );

    public getDocumentTypeById(id: DocumentTypeId): Observable<IDocumentType> {
        return this.documentTypesRepository.getDocumentTypeById(id);
    }

    public createDocumentType(type: DocumentTypeCreateDto): void {
        this.documentTypesRepository.createDocumentType(type);
    }

    public updateDocumentTypeById(id: DocumentTypeId, type: DocumentTypeCreateDto): void {
       this.documentTypesRepository.updateDocumentTypeById(id, type);
    }

    public deleteDocumentTypeById(id: DocumentTypeId): void {
        this.documentTypesRepository.deleteDocumentTypeById(id);
    }

    //#endregion document-types

    constructor() {
        this.editingDocument$.subscribe();
    }
}
