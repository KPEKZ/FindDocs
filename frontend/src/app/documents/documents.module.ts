import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentTableComponent } from './components/document-table/document-table.component';
import { DocumentLeftMenuComponent } from './components/document-left-menu/document-left-menu.component';
import { NgMaterialDependenciesModule } from '../ng-material-dependencies/ng-material-dependencies.module';
import { DocumentsService } from './services/documents.service';
import { DocumentsRepositoryService } from './services/documents-repository.service';
import { DocumentsAdapterService } from './services/documents-adapter.service';
import { DocumentsApiAdapterService } from './services/documents-api-adapter.service';
import { DocumentsStoreModule } from './store/documents-store.module';
import { Store } from '@ngrx/store';
import { documentsActions } from './store/document.actions';
import { CoreModule } from '@core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DocumentPageComponent,
    DocumentComponent,
    DocumentTableComponent,
    DocumentLeftMenuComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    NgMaterialDependenciesModule,
    DocumentsStoreModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DocumentsService,
    DocumentsRepositoryService,
    {
      provide: DocumentsAdapterService,
      useClass: DocumentsApiAdapterService,
    },
  ]
})
export class DocumentsModule {

  private readonly store = inject(Store);

  constructor() {
    this.store.dispatch(documentsActions.loadDocuments());
  }
}
