import { Injectable } from '@angular/core';
import { DocumentDate, DocumentId, IDocument } from '../models/document';
import { Observable } from 'rxjs';
import { DocumentCreateDto } from '../models/document-create-dto';
import { DocumentKeywordId } from '../models/document-keyword';
import { DocumentTypeId } from '../models/document-type';

@Injectable()
export abstract class DocumentsAdapterService {

  protected url = 'api/documents/';

  abstract getDocuments(keywordIds ?: DocumentKeywordId [], docTypeIds ?: DocumentTypeId [], dateFrom ?: DocumentDate, dateTo?: DocumentDate): Observable<IDocument []>;

  abstract getDocumentById(id: DocumentId): Observable<IDocument>;

  abstract updateDocumentById(id: DocumentId, document: DocumentCreateDto): Observable<IDocument>;

  abstract createDocument(document: DocumentCreateDto): Observable<IDocument>;

  abstract deleteDocumentById(id: DocumentId): Observable<void>;
}
