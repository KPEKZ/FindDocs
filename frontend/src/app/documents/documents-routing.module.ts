import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentPageComponent } from './components/document-page/document-page.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentPageComponent
  }
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
