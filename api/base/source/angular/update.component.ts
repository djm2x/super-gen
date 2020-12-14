import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User$ } from 'src/app/models/models';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o: User$;
  title = '';
  visualisation = false;
  /*{selections}*/

  folderToSaveInServer = 'users';

  /*{imagesInit}*/

  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  async ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.visualisation = this.data.visualisation;
    this.createForm();
    if (this.o.id !== 0) {
      this.selectChange('region', this.o.idRegion);
      this.selectChange('province', this.o.idProvince);
      setTimeout(() => this.createForm(), 300);
    }
    /*{imagesFrom}*/

    setTimeout(() => {
       /*{imagesTo}*/
    }, 100);
  }

  selectChange(name: string, id: number) {
    if (name === 'region') {
      this.uow.provinces.getByForeignkey(id).subscribe(r => {
        this.provinces = r;
      });
    } else if (name === 'province'){
      this.uow.communes.getByForeignkey(id).subscribe(r => {
        this.communes = r;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: User$): void {
    let sub = null;
    if (o.id === 0) {
      sub = this.uow.users.post(o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    } else {
      sub = this.uow.users.put(o.id, o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      /*{myFormfields}*/
    });
  }

  resetForm() {
    this.o = new User$();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}
