import { Observable } from "rxjs";
import { DocumentId, IDocument } from "./document";
import { DocumentCreateDto } from "./document-create-dto";

export interface IDocumentRepository {
    getDocuments(): Observable<IDocument []>;
    getDocumentById(id: DocumentId): Observable<IDocument>;
    createDocument(document: DocumentCreateDto): void;
    updateDocumentById(id: DocumentId, document: DocumentCreateDto): void;
    deleteDocumentById(id: DocumentId): void;
}
