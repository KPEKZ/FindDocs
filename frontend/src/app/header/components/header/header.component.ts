import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentEditingFormDialogComponent } from 'src/app/documents/components/document-editing-form-dialog/document-editing-form-dialog.component';
import { DocumentKewordEditingFormDialogComponent } from 'src/app/documents/components/document-keword-editing-form-dialog/document-keword-editing-form-dialog.component';
import { DocumentTypeEditingFormDialogComponent } from 'src/app/documents/components/document-type-editing-form-dialog/document-type-editing-form-dialog.component';

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

    public openEditingKeywordFormDialog(): void {
        this.dialog.open(DocumentKewordEditingFormDialogComponent, {
            panelClass: 'dialog-keyword-container',
        });
    }

    public openEditingTypeFormDialog(): void {
        this.dialog.open(DocumentTypeEditingFormDialogComponent, {
            panelClass: 'dialog-type-container',
        });
    }
}
