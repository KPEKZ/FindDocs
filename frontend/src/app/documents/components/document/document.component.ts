import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { DocumentsService } from '../../services/documents.service';
import { DocumentId } from '../../models/document';
import { shareReplayOneRefCount } from '@core/utils/share-replay-one-ref-count';

@Component({
  selector: 'ds-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentComponent {

    private readonly route = inject(ActivatedRoute);

    private readonly documentService = inject(DocumentsService);

    public readonly document$ = this.route.params.pipe(
        map(params => params['id'] as DocumentId),
        switchMap(id => this.documentService.getDocumentById(id)),
        shareReplayOneRefCount(),
    );

}
