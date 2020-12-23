import { FileUploadService } from '../../services/file.upload.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  listOfNames: string[] = [];
  listToDelete: string[] = [];
  files: File[] = [];
  @Input() nameBtn = '';
  @Input() folderToSaveInServer = 'folder';

  @Input() propertyOfParent = new Subject();
  @Input() eventSubmitToParent = new Subject();
  @Input() eventSubmitFromParent = new Subject();

  constructor(private filesService: FileUploadService) { }

  ngOnInit() {
    this.propertyOfParent.subscribe((r: string) => {
      console.log(r);
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

      formData.append(name, e, name);

    });


    if (formData) {
      await this.filesService.uploadFiles(formData, this.folderToSaveInServer).toPromise();
      await this.filesService.deleteFiles(this.listToDelete, this.folderToSaveInServer).toPromise();
    }
  }

  setFileName(e: File) {
    return `${e.lastModified}_${e.name}`;
  }

}
