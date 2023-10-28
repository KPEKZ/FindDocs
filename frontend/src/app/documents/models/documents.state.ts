import { IDocument } from "./document";

export interface DocumentsState {
    documents: IDocument [];
    documentsIsLoading: boolean;
}
