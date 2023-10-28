import { Injectable, inject } from '@angular/core';
import { DocumentsRepositoryService } from './documents-repository.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DocumentId, IDocument } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { DocumentFilterParams } from '../models/document-filter-params';

@Injectable()
export class DocumentsService {

    protected documentsRepository = inject(DocumentsRepositoryService);

    private readonly documentsFilterFormValues$ = new BehaviorSubject<Partial<DocumentFilterParams> | null>(null);

    public readonly filterFormValues$ = this.documentsFilterFormValues$.asObservable().pipe(
        shareReplayOneRefCount(),
    );

    public get filterFormValues(): Partial<DocumentFilterParams> | null {
        return this.documentsFilterFormValues$.value;
    }

    public set filterFormValues(values: Partial<DocumentFilterParams> | null) {
        this.documentsFilterFormValues$.next(values);
    }

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
}
