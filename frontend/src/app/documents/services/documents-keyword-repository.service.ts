import { Injectable, inject } from '@angular/core';
import { IDocumentKeywordRepository } from '../models/keyword-repository';
import { Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { DocumentKeywordId, IDocumentKeyword } from '../models/document-keyword';
import { DocumentKeywordCreateDto } from '../models/document-keyword-create-dto';
import { documentsSelectors } from '../store/documents.selectors';
import { isNotNill } from '@core/utils/is-not-nill';
import { documentsActions } from '../store/document.actions';

@Injectable()
export class DocumentsKeywordRepositoryService implements IDocumentKeywordRepository {

    private readonly store = inject(Store);

    public getDocumentKeywords(): Observable<IDocumentKeyword []> {
        return this.store.select(documentsSelectors.selectDocumentKeywords);
    }

    public getDocumentKeywordById(id: DocumentKeywordId): Observable<IDocumentKeyword> {
        return this.store.select(documentsSelectors.selectDocumentKeywordById(id)).pipe(
            filter(isNotNill)
        );
    }

    public createDocumentKeyword(keyword: DocumentKeywordCreateDto): void {
        this.store.dispatch(documentsActions.createDocumentKeyword({keyword}));
    }

    public updateDocumentKeywordById(id: DocumentKeywordId, keyword: DocumentKeywordCreateDto): void {
        this.store.dispatch(documentsActions.updateDocumentKeyword({id, keyword}));
    }

    public deleteDocumentKeywordById(id: DocumentKeywordId): void {
        this.store.dispatch(documentsActions.deleteDocumentKeyword({id}));
    }
}
