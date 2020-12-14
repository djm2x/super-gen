import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FileUploadService } from 'src/app/services/file.upload.service';

@Component({
  selector: 'app-upload-select',
  templateUrl: './upload-select.component.html',
  styleUrls: ['./upload-select.component.scss']
})
export class UploadSelectComponent implements OnInit {
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

      this.listOfNames.push(this.setFileName(file) + '0');
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

  active(isActive: boolean, name: string) {



    this.listOfNames.forEach((e, i) => {
      if (name.includes(e.substring(0, e.length - 2))) {

        let newName = this.listOfNames[i];
        newName =  newName.substring(0, newName.length - 1);

        this.listOfNames[i] = `${newName}${isActive ? '1' : '0'}`;

      }
    });

    this.sendPropertyOfParent();

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

    // console.log(this.listOfNames)
    // console.log(propertyOfParent)

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
