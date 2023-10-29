import { Injectable, inject } from '@angular/core';
import { IDocumentTypeRepository } from '../models/type-repository';
import { Store } from '@ngrx/store';
import { DocumentTypeId, IDocumentType } from '../models/document-type';
import { DocumentTypeCreateDto } from '../models/document-type-create-dto';
import { documentsSelectors } from '../store/documents.selectors';
import { Observable, filter } from 'rxjs';
import { isNotNill } from '@core/utils/is-not-nill';
import { documentsActions } from '../store/document.actions';

@Injectable()
export class DocumentsTypeRepositoryService implements IDocumentTypeRepository {

    private readonly store = inject(Store);

    public getDocumentTypes(): Observable<IDocumentType []> {
        return this.store.select(documentsSelectors.selectDocumentTypes);
    }

    public getDocumentTypeById(id: DocumentTypeId): Observable<IDocumentType> {
        return this.store.select(documentsSelectors.selectDocumentTypeById(id)).pipe(
            filter(isNotNill)
        );
    }

    public createDocumentType(type: DocumentTypeCreateDto): void {
        this.store.dispatch(documentsActions.createDocumentType({documentType: type}));
    }

    public updateDocumentTypeById(id: DocumentTypeId, type: DocumentTypeCreateDto): void {
        this.store.dispatch(documentsActions.updateDocumentType({id, documentType: type}));
    }

    public deleteDocumentTypeById(id: DocumentTypeId): void {
        this.store.dispatch(documentsActions.deleteDocumentType({id}));
    }
}
