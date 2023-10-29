import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Self, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFormFields } from '@core/models/form-fields';
import { DocumentCreateDto } from '../../models/document-create-dto';
import { FormBuilder, FormControl } from '@angular/forms';
import { DocumentTypeId, IDocumentType } from '../../models/document-type';
import { DocumentKeywordId, IDocumentKeyword } from '../../models/document-keyword';
import { DocumentLinkId, IDocumentLink } from '../../models/document-link';
import { DocumentDate, DocumentName, DocumentNumber } from '../../models/document';
import { combineLatest, debounceTime, filter, map, of, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { DocumentsService } from '../../services/documents.service';
import * as _ from 'lodash';
import { DocumentsRepositoryService } from '../../services/documents-repository.service';
import { DocumentsKeywordRepositoryService } from '../../services/documents-keyword-repository.service';
import { DocumentsTypeRepositoryService } from '../../services/documents-type-repository.service';
import { DocumentCreateFormParamsDto } from '../../models/document-create-form-params-dto';
import { isNotNill } from '@core/utils/is-not-nill';
import { DestroyService } from '@core/services/destroy.service';
import { IDocumentDialogData } from '../../models/dialog-data';

@Component({
  selector: 'ds-document-editing-form-dialog',
  templateUrl: './document-editing-form-dialog.component.html',
  styleUrls: ['./document-editing-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DocumentsService,
    DocumentsRepositoryService,
    DocumentsKeywordRepositoryService,
    DocumentsTypeRepositoryService,
    DestroyService,
  ]
})
export class DocumentEditingFormDialogComponent {

    private readonly dialogRef = inject(MatDialogRef<DocumentEditingFormDialogComponent>);

    @Self()
    @Inject(DestroyService)
    private readonly destroy = inject(DestroyService);

    private readonly documentsService = inject(DocumentsService);

    private readonly fb = inject(FormBuilder);

    public readonly data: IDocumentDialogData = inject(MAT_DIALOG_DATA);

    private readonly createDocumentEvent = new EventEmitter<void>();

    public readonly documentTypes$ = this.documentsService.documentTypes$;

    public readonly documentKeywords$ = this.documentsService.documentKeywords$;

    public readonly documentEditingParams: IFormFields<DocumentCreateFormParamsDto> = {
        documentTypeId: new FormControl<DocumentTypeId>('' as DocumentTypeId, {nonNullable: true}),
        keywordIds: new FormControl<DocumentKeywordId[]>([], {nonNullable: true}),
        linkIds: new FormControl<DocumentLinkId []>([], {nonNullable: true}),
        number: new FormControl<DocumentNumber>('' as DocumentNumber, {nonNullable: true}),
        name: new FormControl<DocumentName>('' as DocumentName, {nonNullable: true}),
        releaseDate: new FormControl<DocumentDate>('' as DocumentDate, {nonNullable: true}),
        takeEffectDate: new FormControl<DocumentDate>('' as DocumentDate, {nonNullable: true}),
    };

    public readonly documentsEditingForm = this.fb.group<IFormFields<DocumentCreateFormParamsDto>>(this.documentEditingParams);

    public readonly formValueChanges$ = this.documentsEditingForm.valueChanges.pipe(
        debounceTime(100),
        shareReplayOneRefCount(),
    );

    private readonly createDocumentEventSub = this.createDocumentEvent.asObservable().pipe(
            withLatestFrom(this.formValueChanges$),
            withLatestFrom(this.documentKeywords$),
            withLatestFrom(this.documentTypes$),
            tap(([[[_, formValues], keywords], types]) => {

                if (this.data.isEditing) {
                    const values = (formValues as DocumentCreateFormParamsDto);

                    const kids = values.keywordIds?.map(id => keywords.find(k => k.id ===id)) as IDocumentKeyword [];

                    const tids = types.find(t => t.id === formValues.documentTypeId) as IDocumentType;

                    if (kids && tids && !this.data.isEditing) {

                        this.documentsService.createDocument({
                            name: values.name,
                            number: values.number,
                            documentType: tids,
                            keywords: kids,
                            releaseDate: new Date(values.releaseDate).toISOString() as DocumentDate,
                            takeEffectDate: new Date(values.takeEffectDate).toISOString() as DocumentDate,
                        });
                    }

                    if (kids && tids && this.data.isEditing && this.data.editingDocument) {

                        console.log(values, kids, tids);

                        this.documentsService.updateDocumentById(this.data.editingDocument.id, {
                            name: values.name,
                            number: values.number,
                            documentType: tids,
                            keywords: kids,
                            releaseDate: new Date(values.releaseDate).toISOString() as DocumentDate,
                            takeEffectDate: new Date(values.takeEffectDate).toISOString() as DocumentDate,
                        });
                    }

                }

            }),

        takeUntil(this.destroy),

    ).subscribe();

    public createDocument(): void {
        this.createDocumentEvent.next();
    }

    constructor() {
        this.formValueChanges$.subscribe();

        if (this.data.isEditing && this.data.editingDocument) {

            const doc = this.data.editingDocument;

            this.documentsEditingForm.patchValue({
                name: doc.name,
                number: doc.number,
                documentTypeId: doc.documentType.id,
                releaseDate: doc.releaseDate,
                takeEffectDate: doc.takeEffectDate,
                linkIds: doc.links?.map(l => l.id),
                keywordIds: doc.keywords.map(k => k.id),
            })
        }
    }

}
