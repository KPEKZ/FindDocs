import { DocumentDate} from "./document"
import { DocumentKeywordId } from "./document-keyword"
import { DocumentTypeId } from "./document-type"

export type DocumentFilterParams = {
    keywords: DocumentKeywordId [],
    types: DocumentTypeId [],
    dateStartFrom: DocumentDate,
    dateEndTo: DocumentDate,
}
