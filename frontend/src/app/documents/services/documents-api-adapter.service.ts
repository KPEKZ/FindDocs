import { Injectable } from '@angular/core';
import { DocumentsAdapterService } from './documents-adapter.service';
import { Observable, of } from 'rxjs';
import { IDocument, DocumentId } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import * as _ from 'lodash';

@Injectable()
export class DocumentsApiAdapterService extends DocumentsAdapterService {

    public override getDocuments(): Observable<IDocument []> {

        const keys = Object.keys(localStorage);

        const clearedKeys = keys.filter(key => !key.includes('DF-'));

        const documents: IDocument[] = clearedKeys.map(ck => JSON.parse(localStorage[ck]));

        return of(documents);
    }

    public override getDocumentById(id: DocumentId): Observable<IDocument> {

        const rawDocument = localStorage.getItem(`DT-${id}`);

        if (rawDocument){
            const document: IDocument = JSON.parse(rawDocument);

            return of(document)
        }

        return of({} as IDocument);
    }

    public override updateDocumentById(id: DocumentId, document: DocumentCreateDto): Observable<IDocument> {
        const rawDocument = localStorage.getItem(`DT-${id}`);

        if (rawDocument){
            localStorage.removeItem(`DT-${id}`);

            localStorage.setItem(`DT-${id}`, JSON.stringify(document));

            return of({id, ...document})
        }

        return of({} as IDocument);
    }

    public override createDocument(document: DocumentCreateDto): Observable<IDocument> {

        const generatedId = _.random(0, 1_000_000);

        const id = `DT-${generatedId}`;

        localStorage.setItem(id, JSON.stringify(document));

        return of(({id: generatedId, ...document}) as IDocument)
    }

    public override deleteDocumentById(id: DocumentId): Observable<void> {
        const rawDocument = localStorage.getItem(`DT-${id}`);

        if (rawDocument){
            localStorage.removeItem(`DT-${id}`);
        }

        return of();
    }
}
