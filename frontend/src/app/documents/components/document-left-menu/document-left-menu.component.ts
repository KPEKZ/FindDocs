import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { DocumentCreateDto } from '../../models/document-create-dto';
import { debounceTime, map, tap } from 'rxjs';
import * as _ from 'lodash';
import { FormBuilder, FormControl } from '@angular/forms';
import { IFormFields } from '@core/models/form-fields';
import { DocumentFilterParams } from '../../models/document-filter-params';
import { IDocumentType } from '../../models/document-type';
import { IDocumentKeyword } from '../../models/document-keyword';
import { DocumentDate } from '../../models/document';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';

@Component({
  selector: 'ds-document-left-menu',
  templateUrl: './document-left-menu.component.html',
  styleUrls: ['./document-left-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentLeftMenuComponent {

    private readonly documentsService = inject(DocumentsService);

    private readonly fb = inject(FormBuilder);

    public readonly documentTypes$ = this.documentsService.documents$.pipe(
        map(d => _.uniq(d.flatMap(e => e.documentType))),
        tap(c => console.log(c))
    );

    public readonly documentKeywords$ = this.documentsService.documents$.pipe(
        map(d =>  _.uniq(d.flatMap(e => e.keywords)))
    );

    public readonly documentParams: IFormFields<DocumentFilterParams> = {
        types: new FormControl<IDocumentType[]>([], {nonNullable: true}),
        keywords: new FormControl<IDocumentKeyword[]>([], {nonNullable: true}),
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

}
