import { HttpClientModule } from '@angular/common/http';
import { MatModule } from 'src/app/mat.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DownloadSheetComponent } from './download-sheet/download-sheet.component';
import { UploadImageComponent } from './upload-image/upload-image.component';



@NgModule({
  declarations: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
  ],
  imports: [
    CommonModule,
    MatModule,
    HttpClientModule,
  ],
  exports: [
    UploadComponent,
    DownloadSheetComponent,
    UploadImageComponent,
  ]
})
export class ManageFilesModule { }
