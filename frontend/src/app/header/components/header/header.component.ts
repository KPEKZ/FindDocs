import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentEditingFormDialogComponent } from 'src/app/documents/components/document-editing-form-dialog/document-editing-form-dialog.component';
import { DocumentKewordEditingFormDialogComponent } from 'src/app/documents/components/document-keword-editing-form-dialog/document-keword-editing-form-dialog.component';
import { DocumentTypeEditingFormDialogComponent } from 'src/app/documents/components/document-type-editing-form-dialog/document-type-editing-form-dialog.component';
import { DocumentDate, DocumentId, DocumentName, DocumentNumber, IDocument } from 'src/app/documents/models/document';
import { DocumentCreateDto } from 'src/app/documents/models/document-create-dto';
import { IDocumentKeyword } from 'src/app/documents/models/document-keyword';
import { read, utils } from 'xlsx';
import { v4 } from 'uuid';
import { IDocumentType } from 'src/app/documents/models/document-type';
import { DocumentsService } from 'src/app/documents/services/documents.service';
import { Store } from '@ngrx/store';
import { documentsActions } from 'src/app/documents/store/document.actions';

@Component({
  selector: 'ds-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
    private readonly dialog = inject(MatDialog);

    private readonly documentsService = inject(DocumentsService);

    private readonly store = inject(Store);

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

    public handleImport($event: Event) {

        const input = $event.target as HTMLInputElement;

        const files = input.files;

        if (files && files.length) {
            const file = files[0];
            const reader = new FileReader();

            const documents: DocumentCreateDto [] = [];

            reader.onload = (event: any) => {

                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows: Record<string, string | number>[] = utils.sheet_to_json(wb.Sheets[sheets[0]]);

                    rows.forEach((row => {

                        console.log(row);

                        const document: DocumentCreateDto = {
                            takeEffectDate: new Date(row["Дата ввода действие"]).toISOString() as DocumentDate,
                            releaseDate: new Date(row["Дата выхода"]).toISOString() as DocumentDate,
                            keywords: String(row["Ключе вые слова"]).split(',').map(k => ({id: v4(), name: k } ) as IDocumentKeyword) as IDocumentKeyword[],
                            name: row["Название"] as DocumentName,
                            number: row["Номер"] as DocumentNumber,
                            documentType: {
                                id: v4(),
                                name: row["Тип"]
                            } as  IDocumentType
                        };

                        documents.push(document);
                    }));

                    console.log(rows);
                }

                console.log(documents);

                documents.forEach(d => {

                    this.documentsService.createDocument(d);

                });

            }


            reader.readAsArrayBuffer(file);


        }
    }
}
