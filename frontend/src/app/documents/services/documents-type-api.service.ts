import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentTypeId, IDocumentType } from '../models/document-type';
import { DocumentTypeCreateDto } from '../models/document-type-create-dto';

@Injectable()
export class DocumentsTypeApiService {

    private readonly http = inject(HttpClient);

    protected readonly url = 'https://localhost:7222/DocumentType';

    public getDocumentTypes(): Observable<IDocumentType []> {

        return this.http.get<IDocumentType []>(`${this.url}/all`);
    }

    public getDocumentTypeById(id: DocumentTypeId): Observable<IDocumentType> {

        return this.http.get<IDocumentType>(`${this.url}?id=${id}`);
    }

    public updateDocumentTypeById(id: DocumentTypeId, type: DocumentTypeCreateDto): Observable<IDocumentType> {

        return this.http.put<IDocumentType>(`${this.url}`, {id, ...type});
    }

    public createDocumentType(type: DocumentTypeCreateDto): Observable<IDocumentType> {

        return this.http.post<IDocumentType>(`${this.url}`, type);
    }

    public deleteDocumentTypeById(id: DocumentTypeId): Observable<void> {

        return this.http.delete<void>(`${this.url}?id=${id}`);
    }
}
