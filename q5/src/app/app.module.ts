import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiModule } from './api/api.module';
import { UiModule } from './ui/ui.module';
import { GalleryModule } from './gallery/gallery.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    ApiModule,
    UiModule,
    GalleryModule,
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
