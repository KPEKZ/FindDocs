import { ChangeDetectionStrategy, Component, Inject, Self, inject } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { Subject, debounceTime, filter, switchMap, takeUntil, tap } from 'rxjs';
import { DocumentId, IDocument } from '../../models/document';
import { MatDialog } from '@angular/material/dialog';
import { DocumentEditingFormDialogComponent } from '../document-editing-form-dialog/document-editing-form-dialog.component';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';
import * as _ from 'lodash';
import { DestroyService } from '@core/services/destroy.service';
import { Store } from '@ngrx/store';
import { documentsActions } from '../../store/document.actions';

@Component({
  selector: 'ds-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyService,
  ]
})
export class DocumentTableComponent {

    private readonly documentsService = inject(DocumentsService);

    @Self()
    @Inject(DestroyService)
    private readonly destroy = inject(DestroyService);

    private readonly store = inject(Store);

    private readonly dialog = inject(MatDialog);

    public readonly documents$ = this.documentsService.documents$;

    public readonly searchTermSubject$ = new Subject<string>();

    public readonly searchTerm$ = this.searchTermSubject$.asObservable().pipe(
        shareReplayOneRefCount(),
    );

    private readonly searchDocsSub = this.searchTerm$.pipe(
        filter(term => !_.isEmpty(term)),
        debounceTime(150),
        takeUntil(this.destroy),
    ).subscribe((name) => {
        this.store.dispatch(documentsActions.searchDocuments({name}));
    });

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

    public onSearch(event: Event): void {

        const input = event.target as HTMLInputElement;

        this.searchTermSubject$.next(input .value);
    }

}
