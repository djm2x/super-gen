import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { FileUploadService } from 'src/app/services/file.upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  listOfNames: string[] = [];
  listToDelete: string[] = [];
  files: File[] = [];
  progress = 0;
  @Input() nameBtn = '';
  @Input() folderToSaveInServer = 'folder';

  @Input() propertyOfParent = new Subject();
  @Input() eventSubmitToParent = new Subject();
  @Input() eventSubmitFromParent = new Subject();
  @Input() eventSubmitFromChild = new Subject();

  constructor(private filesService: FileUploadService) { }

  ngOnInit() {
    this.propertyOfParent.subscribe((r: string) => {
      if (!r) {
        return;
      }
      const l = r.split(';');

      l.pop();

      this.listOfNames = l;
      this.listToDelete = [];
    });
    //
    this.eventSubmitFromParent.subscribe(async r => {
      await this.submit();
    });


  }

  upload(files: FileList) {
    const s = files;
    // let file = null;
    for (let i = 0; i < files.length; i++) {
      // on récupère le i-ème fichier
      const file = files.item(i);

      this.listOfNames.push(this.setFileName(file));
      this.sendPropertyOfParent();

      this.files.push(file);
      // ou encore

    }
  }

  setIcon(filaName) {
    const i = filaName.lastIndexOf('.');
    const s = filaName.substring(i + 1);
    // console.log(s);
    return (s === 'pdf' || s === 'pdf;') ? 'assets/svg/pdf.svg' : 'assets/svg/word.svg';
  }

  remove(name: string) {

    const i = this.listOfNames.findIndex(e => e === name);

    if (i !== -1) {
      this.listOfNames.splice(i, 1);
      this.sendPropertyOfParent();
    }

    this.listToDelete.push(name);

    // delete from Files

    const indexOf_ = name.indexOf('_');

    const fileName = name.substring(indexOf_);

    const indexFileName = this.files.findIndex(e => e.name === fileName);

    if (indexFileName !== -1) {
      this.files.splice(i, 1);
    }
  }

  openInput(o/*: HTMLInputElement*/) {
    o.click();
  }

  sendPropertyOfParent() {
    let propertyOfParent = '';

    this.listOfNames.forEach(r => {
      propertyOfParent += `${r};`;
    });

    this.eventSubmitToParent.next(propertyOfParent);
  }

  async submit() {


    const formData = new FormData();

    this.files.forEach(e => {

      const name = this.setFileName(e);
      // e.
      formData.append('files', e);

    });


    if (formData) {
      // this.filesService.uploadFiles2(formData, this.folderToSaveInServer)
      this.filesService.uploadFiles(formData, this.folderToSaveInServer).subscribe((event: HttpEvent<any>) => {
        // console.log(event)
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            // console.log('User successfully created!', event.body);
            this.eventSubmitFromChild.next(event.body);
            // setTimeout(() => {
            //   this.progress = 0;
            // }, 1500);

        }
      });

      // try {
      //   await this.filesService.uploadFiles2(formData, this.folderToSaveInServer).toPromise();

      // } catch (error) {

      // }
      // await this.filesService.deleteFiles(this.listToDelete, this.folderToSaveInServer).toPromise();
    }
  }

  setFileName(e: File) {
    return `${e.lastModified}_${e.name}`;
  }

}
