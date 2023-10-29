import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentKeywordId, IDocumentKeyword } from '../models/document-keyword';
import { DocumentKeywordCreateDto } from '../models/document-keyword-create-dto';

@Injectable()
export class DocumentsKeywordApiService {

    private readonly http = inject(HttpClient);

    protected readonly url = 'https://localhost:7222/Keyword';

    public getDocumentKeywords(): Observable<IDocumentKeyword []> {

        return this.http.get<IDocumentKeyword []>(`${this.url}/all`);
    }

    public getDocumentKeywordById(id: DocumentKeywordId): Observable<IDocumentKeyword> {

        return this.http.get<IDocumentKeyword>(`${this.url}?id=${id}`);
    }

    public updateDocumentKeywordById(id: DocumentKeywordId, keyword: DocumentKeywordCreateDto): Observable<IDocumentKeyword> {

        return this.http.put<IDocumentKeyword>(`${this.url}`, {id, ...keyword});
    }

    public createDocumentKeyword(document: DocumentKeywordCreateDto): Observable<IDocumentKeyword> {

        return this.http.post<IDocumentKeyword>(`${this.url}`, document);
    }

    public deleteDocumentKeywordById(id: DocumentKeywordId): Observable<void> {

        return this.http.delete<void>(`${this.url}?id=${id}`);
    }
}
