import { Injectable, inject } from '@angular/core';
import { DocumentsAdapterService } from './documents-adapter.service';
import { Observable, of } from 'rxjs';
import { IDocument, DocumentId } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DocumentsApiAdapterService extends DocumentsAdapterService {

    private readonly http = inject(HttpClient);

    protected override readonly url = 'https://localhost:7222/Document';

    public override getDocuments(): Observable<IDocument []> {

        // const keys = Object.keys(localStorage);

        // const regex = /^(DT-)/gmi;

        // const clearedKeys = keys.filter(key => key.match(regex));

        // const documents: IDocument[] = clearedKeys.map(ck => JSON.parse(localStorage[ck]));

        // return of(documents);

        return this.http.get<IDocument []>(`${this.url}/all`);
    }

    public override getDocumentById(id: DocumentId): Observable<IDocument> {

        // const rawDocument = localStorage.getItem(`DT-${id}`);

        // if (rawDocument){
        //     const document: IDocument = JSON.parse(rawDocument);

        //     return of(document)
        // }

        // return of({} as IDocument);

        return this.http.get<IDocument>(`${this.url}?id=${id}`);
    }

    public override updateDocumentById(id: DocumentId, document: DocumentCreateDto): Observable<IDocument> {
        // const rawDocument = localStorage.getItem(`DT-${id}`);

        // if (rawDocument){
        //     localStorage.removeItem(`DT-${id}`);

        //     localStorage.setItem(`DT-${id}`, JSON.stringify(document));

        //     return of({id, ...document})
        // }

        // return of({} as IDocument);

        return this.http.put<IDocument>(`${this.url}`, {id, ...document});
    }

    public override createDocument(document: DocumentCreateDto): Observable<IDocument> {

        // const generatedId = _.random(0, 1_000_000);

        // const id = `DT-${generatedId}`;

        // localStorage.setItem(id, JSON.stringify({id: generatedId, ...document}));

        // return of(({id: generatedId, ...document}) as IDocument)

        return this.http.post<IDocument>(`${this.url}`, document);
    }

    public override deleteDocumentById(id: DocumentId): Observable<void> {
        // const rawDocument = localStorage.getItem(`DT-${id}`);

        // if (rawDocument){
        //     localStorage.removeItem(`DT-${id}`);
        // }

        // return of();

        return this.http.delete<void>(`${this.url}?id=${id}`);
    }
}
