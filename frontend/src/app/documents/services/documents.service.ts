import { Injectable, inject } from '@angular/core';
import { DocumentsRepositoryService } from './documents-repository.service';
import { Observable } from 'rxjs';
import { DocumentId, IDocument } from '../models/document';
import { DocumentCreateDto } from '../models/document-create-dto';

@Injectable()
export class DocumentsService {

    private readonly documentsRepository = inject(DocumentsRepositoryService);

    public readonly documents$ = this.documentsRepository.getDocuments();

    public getDocumentById(id: DocumentId): Observable<IDocument> {
        return this.documentsRepository.getDocumentById(id);
    }

    public createDocument(document: DocumentCreateDto): void {
        this.documentsRepository.createDocument(document);
    }

    public updateDocumentById(id: DocumentId, document: DocumentCreateDto): void {
       this.documentsRepository.updateDocumentById(id, document);
    }

    public deleteDocumentById(id: DocumentId): void {
        this.documentsRepository.deleteDocumentById(id);
    }
}
