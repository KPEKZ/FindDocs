import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkZoneComponent } from './components/work-zone/work-zone.component';
import { DestroyService } from './services/destroy.service';



@NgModule({
  declarations: [
    WorkZoneComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DestroyService,
  ],
  exports: [
    WorkZoneComponent,
  ]
})
export class CoreModule { }
