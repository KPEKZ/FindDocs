import { Injectable, inject } from '@angular/core';
import { IDocumentRepository } from '../models/document-repository';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { IDocument, DocumentId } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import { documentsSelectors } from '../store/documents.selectors';
import { isNotNill } from '@core/utils/is-not-nill';
import { documentsActions } from '../store/document.actions';

@Injectable()
export class DocumentsRepositoryService implements IDocumentRepository {

    private readonly store = inject(Store);

    public getDocuments(): Observable<IDocument []> {
        return this.store.select(documentsSelectors.selectDocuments);
    }

    public getDocumentById(id: DocumentId): Observable<IDocument> {
        return this.store.select(documentsSelectors.selectDocumentById(id)).pipe(
            filter(isNotNill)
        );
    }

    public createDocument(document: DocumentCreateDto): void {
        this.store.dispatch(documentsActions.createDocument({document}));
    }

    public updateDocumentById(id: DocumentId, document: DocumentCreateDto): void {
        this.store.dispatch(documentsActions.updateDocument({id, document}));
    }

    public deleteDocumentById(id: DocumentId): void {
        this.store.dispatch(documentsActions.deleteDocument({id}));
    }
}
