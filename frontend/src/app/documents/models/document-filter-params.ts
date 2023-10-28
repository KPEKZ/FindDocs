import { DocumentDate} from "./document"
import { IDocumentKeyword } from "./document-keyword"
import { IDocumentType } from "./document-type"

export type DocumentFilterParams = {
    keywords: IDocumentKeyword [],
    types: IDocumentType [],
    dateStartFrom: DocumentDate,
    dateEndTo: DocumentDate,
}
