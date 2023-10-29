import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NgMaterialDependenciesModule } from '../ng-material-dependencies/ng-material-dependencies.module';
import { DocumentsService } from '../documents/services/documents.service';
import { DocumentsRepositoryService } from '../documents/services/documents-repository.service';
import { DocumentsKeywordRepositoryService } from '../documents/services/documents-keyword-repository.service';
import { DocumentsTypeRepositoryService } from '../documents/services/documents-type-repository.service';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NgMaterialDependenciesModule,
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [
    DocumentsService,
    DocumentsRepositoryService,
    DocumentsKeywordRepositoryService,
    DocumentsTypeRepositoryService,
  ]
})
export class HeaderModule { }
