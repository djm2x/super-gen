import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/models';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: User;
  title = '';
  roles = this.uow.roles.get();


  folderToSaveInServer = 'users';

  

  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
    

    setTimeout(() => {
       
    }, 100);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: User): void {
    if (o.id === 0) {
      this.uow.users.post(o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    } else {
      this.uow.users.put(o.id, o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.required, ]],
name: [this.o.name, [Validators.required, ]],
email: [this.o.email, [Validators.required, Validators.email]],
password: [this.o.password, [Validators.required, ]],
date: [this.o.date, [Validators.required, ]],
isActive: [this.o.isActive, [Validators.required, ]],
idRole: [this.o.idRole, [Validators.required, ]],

    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

}
