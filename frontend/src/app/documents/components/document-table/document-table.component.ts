import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocumentsService } from '../../services/documents.service';
import { tap } from 'rxjs';

@Component({
  selector: 'ds-document-table',
  templateUrl: './document-table.component.html',
  styleUrls: ['./document-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentTableComponent {

    private readonly documentsService = inject(DocumentsService);

    public readonly documents$ = this.documentsService.documents$.pipe(tap(c => console.log(c)));

    public displayedColumns: string [] =  ['Name', 'Type', 'Number', 'ReleaseDate', 'TakeEffectDate', 'Keywords', 'Links'];


}
