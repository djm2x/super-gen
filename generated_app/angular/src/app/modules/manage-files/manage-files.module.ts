import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DownloadSheetComponent } from './download-sheet/download-sheet.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
  ]
})
export class ManageFilesModule { }
