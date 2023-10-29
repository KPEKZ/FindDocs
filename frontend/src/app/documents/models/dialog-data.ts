import { IDocument } from "./document";

export interface IDocumentDialogData {
    isEditing: boolean;
    editingDocument: IDocument | null;
}
