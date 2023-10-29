import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentsService } from '../../services/documents.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { IFormFields } from '@core/models/form-fields';
import { DocumentKeyWordName, DocumentKeywordId, IDocumentKeyword } from '../../models/document-keyword';
import { debounceTime } from 'rxjs/operators';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { DocumentKeywordCreateDto } from '../../models/document-keyword-create-dto';
import { DestroyService } from '@core/services/destroy.service';
import { DocumentsKeywordRepositoryService } from '../../services/documents-keyword-repository.service';
import { DocumentsRepositoryService } from '../../services/documents-repository.service';
import { DocumentsTypeRepositoryService } from '../../services/documents-type-repository.service';

@Component({
  selector: 'ds-document-keword-editing-form-dialog',
  templateUrl: './document-keword-editing-form-dialog.component.html',
  styleUrls: ['./document-keword-editing-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DocumentsService,
    DocumentsRepositoryService,
    DocumentsKeywordRepositoryService,
    DocumentsTypeRepositoryService,
    DestroyService,
  ]
})
export class DocumentKewordEditingFormDialogComponent {
    private readonly dialogRef = inject(MatDialogRef<DocumentKewordEditingFormDialogComponent>);

    private readonly documentsService = inject(DocumentsService);

    private readonly fb = inject(FormBuilder);

    public readonly documentKeywords$ = this.documentsService.documentKeywords$;

    public readonly documentKeywordEditingParams: IFormFields<DocumentKeywordCreateDto> = {
        name: new FormControl<DocumentKeyWordName>('' as DocumentKeyWordName, {nonNullable: true}),
    };

    public readonly documentsKeywordEditingForm = this.fb.group<IFormFields<DocumentKeywordCreateDto>>(this.documentKeywordEditingParams);

    public readonly formValueChanges$ = this.documentsKeywordEditingForm.valueChanges.pipe(
        debounceTime(100),
        shareReplayOneRefCount(),
    );

    public createDocumentKeyword(name: string): void {

        this.documentsService.createDocumentKeyword({name: name as DocumentKeyWordName});
    }

    public deleteDocumentKeyword(id: DocumentKeywordId): void {

        this.documentsService.deleteDocumentKeywordById(id);
    }
}
