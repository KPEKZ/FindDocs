import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentTableComponent } from './components/document-table/document-table.component';
import { DocumentLeftMenuComponent } from './components/document-left-menu/document-left-menu.component';
import { NgMaterialDependenciesModule } from '../ng-material-dependencies/ng-material-dependencies.module';



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
  ]
})
export class DocumentsModule { }
