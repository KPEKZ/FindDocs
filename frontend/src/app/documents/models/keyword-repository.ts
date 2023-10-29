import { Observable } from "rxjs";
import { DocumentKeywordId, IDocumentKeyword } from "./document-keyword";
import { DocumentKeywordCreateDto } from "./document-keyword-create-dto";

export interface IDocumentKeywordRepository {
    getDocumentKeywords(): Observable<IDocumentKeyword []>;
    getDocumentKeywordById(id: DocumentKeywordId): Observable<IDocumentKeyword>;
    createDocumentKeyword(document: DocumentKeywordCreateDto): void;
    updateDocumentKeywordById(id: DocumentKeywordId, document: DocumentKeywordCreateDto): void;
    deleteDocumentKeywordById(id: DocumentKeywordId): void;
}
