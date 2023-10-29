import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentsService } from '../../services/documents.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { IFormFields } from '@core/models/form-fields';
import { DocumentTypeCreateDto } from '../../models/document-type-create-dto';
import { DocumentTypeId, DocumentTypeName } from '../../models/document-type';
import { debounceTime, tap } from 'rxjs';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { DestroyService } from '@core/services/destroy.service';
import { DocumentsKeywordRepositoryService } from '../../services/documents-keyword-repository.service';
import { DocumentsRepositoryService } from '../../services/documents-repository.service';
import { DocumentsTypeRepositoryService } from '../../services/documents-type-repository.service';
import { documentsActions } from '../../store/document.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ds-document-type-editing-form-dialog',
  templateUrl: './document-type-editing-form-dialog.component.html',
  styleUrls: ['./document-type-editing-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DocumentsService,
    DocumentsRepositoryService,
    DocumentsKeywordRepositoryService,
    DocumentsTypeRepositoryService,
    DestroyService,
  ]
})
export class DocumentTypeEditingFormDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<DocumentTypeEditingFormDialogComponent>);

    private readonly store = inject(Store);

    private readonly documentsService = inject(DocumentsService);

    private readonly fb = inject(FormBuilder);

    public readonly documentTypes$ = this.documentsService.documentTypes$;

    public readonly documentTypeEditingParams: IFormFields<DocumentTypeCreateDto> = {
        name: new FormControl<DocumentTypeName>('' as DocumentTypeName, {nonNullable: true}),
    };

    public readonly documentsTypeEditingForm = this.fb.group<IFormFields<DocumentTypeCreateDto>>(this.documentTypeEditingParams);

    public readonly formValueChanges$ = this.documentsTypeEditingForm.valueChanges.pipe(
        debounceTime(100),
        shareReplayOneRefCount(),
    );

    public createDocumentType(name: string): void {

        this.documentsService.createDocumentType({name: name as DocumentTypeName});
    }

    public deleteDocumentType(id: DocumentTypeId): void {

        this.documentsService.deleteDocumentTypeById(id);
    }
}
