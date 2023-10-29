import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { tap } from 'rxjs';
import { DocumentId, IDocument } from '../../models/document';
import { MatDialog } from '@angular/material/dialog';
import { DocumentEditingFormDialogComponent } from '../document-editing-form-dialog/document-editing-form-dialog.component';

@Component({
  selector: 'ds-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTableComponent {

    private readonly documentsService = inject(DocumentsService);

    private readonly dialog = inject(MatDialog);

    public readonly documents$ = this.documentsService.documents$.pipe(tap(c => console.log(c)));

    public deleteDocument(event: MouseEvent, docId: DocumentId): void {

        event.stopPropagation();
        event.preventDefault();

        this.documentsService.deleteDocumentById(docId);
    }

    public openEditingFormDialog(event: MouseEvent, doc: IDocument): void {

        event.stopPropagation();
        event.preventDefault();

        this.documentsService.editingDocument = doc;

        this.dialog.open(DocumentEditingFormDialogComponent, {
            panelClass: 'dialog-container',
            data: {
                isEditing: true,
                editingDocument: doc,
            }
        });
    }

}
