import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentPageComponent } from './components/document-page/document-page.component';
import { DocumentComponent } from './components/document/document.component';
import { DocumentTableComponent } from './components/document-table/document-table.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentPageComponent,
    children: [
      {
        path: '',
        component: DocumentTableComponent,

      },
      {
        path: ':id',
        component: DocumentComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
})
export class DocumentsRoutingModule { }
