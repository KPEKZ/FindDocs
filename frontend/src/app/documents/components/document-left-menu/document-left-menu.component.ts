import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { DocumentCreateDto } from '../../models/document-create-dto';
import { debounceTime, map, tap } from 'rxjs';
import * as _ from 'lodash';
import { FormBuilder, FormControl } from '@angular/forms';
import { IFormFields } from '@core/models/form-fields';
import { DocumentFilterParams } from '../../models/document-filter-params';
import { DocumentTypeId, IDocumentType } from '../../models/document-type';
import { DocumentKeywordId, IDocumentKeyword } from '../../models/document-keyword';
import { DocumentDate } from '../../models/document';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import { Store } from '@ngrx/store';
import { documentsActions } from '../../store/document.actions';

@Component({
  selector: 'ds-document-left-menu',
  templateUrl: './document-left-menu.component.html',
  styleUrls: ['./document-left-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentLeftMenuComponent {

    private readonly documentsService = inject(DocumentsService);

    private readonly store = inject(Store);

    private readonly fb = inject(FormBuilder);

    public readonly documentTypes$ = this.documentsService.documentTypes$;

    public readonly documentKeywords$ = this.documentsService.documentKeywords$;

    public readonly documentParams: IFormFields<DocumentFilterParams> = {
        types: new FormControl<DocumentTypeId[]>([], {nonNullable: true}),
        keywords: new FormControl<DocumentKeywordId[]>([], {nonNullable: true}),
        dateStartFrom: new FormControl<DocumentDate>('' as DocumentDate, {nonNullable: true}),
        dateEndTo: new FormControl<DocumentDate>('' as DocumentDate, {nonNullable: true}),
    };

    public readonly documentsForm = this.fb.group<IFormFields<DocumentFilterParams>>(this.documentParams);

    public readonly formValueChanges$ = this.documentsForm.valueChanges.pipe(
        debounceTime(100),
        shareReplayOneRefCount(),
        tap(values => {
            this.documentsService.filterFormValues = values;
        }),
    );

    public submitParams(): void {

      console.log(this.documentsForm.value.keywords);

      this.store.dispatch(documentsActions.loadDocuments({
        keywords: this.documentsForm.value.keywords,
        types: this.documentsForm.value.types,
        dateFrom: this.documentsForm.value.dateStartFrom,
        dateTo: this.documentsForm.value.dateEndTo,
      }));
    }

}
