import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { ApiModule } from '../api/api.module';
import { DetailComponent } from './components/detail.component';
import { GalleryComponent } from './components/gallery.component';

@NgModule({
  imports: [
    ApiModule,
    BrowserModule
  ],
  declarations: [
    GalleryComponent,
    DetailComponent
  ],
  entryComponents: [
    DetailComponent
  ],
  exports: [
    GalleryComponent
  ]
})
export class GalleryModule { }
