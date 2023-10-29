import { Injectable, inject } from '@angular/core';
import { DocumentsAdapterService } from './documents-adapter.service';
import { Observable } from 'rxjs';
import { IDocument, DocumentId, DocumentDate } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';
import * as _ from 'lodash';
import { HttpClient } from '@angular/common/http';
import { DocumentKeywordId } from '../models/document-keyword';
import { DocumentTypeId } from '../models/document-type';
import { removeExtraSign } from '@core/utils/remove-extra-sign';

@Injectable()
export class DocumentsApiAdapterService extends DocumentsAdapterService {

    private readonly http = inject(HttpClient);

    protected override readonly url = 'https://localhost:7222/Document';

    public override getDocuments(keywordIds ?: DocumentKeywordId [], docTypeIds ?: DocumentTypeId [], dateFrom ?: DocumentDate, dateTo?: DocumentDate): Observable<IDocument []> {

        console.log(keywordIds);

        const keyws = keywordIds ? keywordIds.map(id => `keywordIds=${id}`): null;
        const docs = docTypeIds ? docTypeIds.map(id => `documentTypeIds=${id}`): null;
        const start = dateFrom ? ['from=' + new Date(dateFrom).toISOString()] : null;
        const end = dateTo ? ['to=' + new Date(dateTo).toISOString()] : null;

        let query = [keyws, docs, start, end]
            .filter(t => !_.isNil(t))
            .map(v => v?.join('&'))
            .join('&');

        query = removeExtraSign(query, '&');

        const url = [`${this.url}/all`, query].join('?');

        return this.http.get<IDocument []>(url);
    }

    public override getDocumentById(id: DocumentId): Observable<IDocument> {

        return this.http.get<IDocument>(`${this.url}?id=${id}`);
    }

    public override updateDocumentById(id: DocumentId, document: DocumentCreateDto): Observable<IDocument> {

        return this.http.put<IDocument>(`${this.url}`, {id, ...document});
    }

    public override createDocument(document: DocumentCreateDto): Observable<IDocument> {

        return this.http.post<IDocument>(`${this.url}`, document);
    }

    public override deleteDocumentById(id: DocumentId): Observable<void> {

        return this.http.delete<void>(`${this.url}?id=${id}`);
    }
}
