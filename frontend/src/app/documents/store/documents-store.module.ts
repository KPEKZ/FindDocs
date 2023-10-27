import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { DocumentsEffects } from './documents.effects';



@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([DocumentsEffects]),
  ],
})
export class DocumentsStoreModule { }
