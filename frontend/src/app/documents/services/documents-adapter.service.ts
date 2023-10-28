import { Injectable } from '@angular/core';
import { DocumentId, IDocument } from '../models/document';
import { Observable } from 'rxjs';
import { DocumentCreateDto } from '../models/document-create-dto';

@Injectable()
export abstract class DocumentsAdapterService {

  protected url = 'api/documents/';

  abstract getDocuments(): Observable<IDocument []>;

  abstract getDocumentById(id: DocumentId): Observable<IDocument>;

  abstract updateDocumentById(id: DocumentId, document: DocumentCreateDto): Observable<IDocument>;

  abstract createDocument(document: DocumentCreateDto): Observable<IDocument>;

  abstract deleteDocumentById(id: DocumentId): Observable<void>;
}
