import { Observable } from "rxjs";
import { DocumentTypeId, IDocumentType } from "./document-type";
import { DocumentTypeCreateDto } from "./document-type-create-dto";

export interface IDocumentTypeRepository {
    getDocumentTypes(): Observable<IDocumentType []>;
    getDocumentTypeById(id: DocumentTypeId): Observable<IDocumentType>;
    createDocumentType(document: DocumentTypeCreateDto): void;
    updateDocumentTypeById(id: DocumentTypeId, document: DocumentTypeCreateDto): void;
    deleteDocumentTypeById(id: DocumentTypeId): void;
}
