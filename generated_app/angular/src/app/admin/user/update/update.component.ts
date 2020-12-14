import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/models';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o: User;
  title = '';
  visualisation = false;
  roles = this.uow.roles.get();


  folderToSaveInServer = 'users';

  imageUrlTo = new Subject();
imageUrlFrom = new Subject();



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
    this.imageUrlFrom.subscribe(r => this.myForm.get('imageUrl').setValue(r));


    setTimeout(() => {
       setTimeout(() => { this.imageUrlTo.next(this.o.imageUrl);;
  }, 100);
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

  onOkClick(o: User): void {
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
      id: [this.o.id, [Validators.required, ]],
nom: [this.o.nom, [Validators.required, ]],
email: [this.o.email, [Validators.required, Validators.email]],
password: [this.o.password, [Validators.required, ]],
isActive: [this.o.isActive, [Validators.required, ]],
imageUrl: [this.o.imageUrl, [Validators.required, ]],
profil: [this.o.profil, [Validators.required, ]],
idRole: [this.o.idRole, [Validators.required, ]],

    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}
