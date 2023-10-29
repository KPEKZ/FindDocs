import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentEditingFormDialogComponent } from 'src/app/documents/components/document-editing-form-dialog/document-editing-form-dialog.component';
import { DocumentsService } from 'src/app/documents/services/documents.service';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    private readonly dialog = inject(MatDialog);

    public openEditingFormDialog(): void {
        this.dialog.open(DocumentEditingFormDialogComponent, {
            panelClass: 'dialog-container',
            data: {
                isEditing: false,
                editingDocument: null,
            }
        });
    }
}
