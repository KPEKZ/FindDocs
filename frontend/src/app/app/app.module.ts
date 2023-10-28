import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '../core/core.module';
import { HeaderModule } from '../header/header.module';
import { NgMaterialDependenciesModule } from '../ng-material-dependencies/ng-material-dependencies.module';
import { AppStoreModule } from './store/app-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppStoreModule,
    CoreModule,
    HeaderModule,
    NgMaterialDependenciesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
