import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/models/models';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  myForm: FormGroup;
  o: Role;
  title = '';
  

  folderToSaveInServer = 'roles';

  /*{imagesInit}*/

  

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  async ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
   
    /*{imagesFrom}*/

    setTimeout(() => {
       /*{imagesTo}*/
    }, 100);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Role): void {
    let sub = null;
    if (o.id === 0) {
      sub = this.uow.roles.post(o).subscribe(r => {
        
        this.dialogRef.close(o);
      });
    } else {
      sub = this.uow.roles.put(o.id, o).subscribe(r => {
        
        this.dialogRef.close(o);
      });
    }

    this.subs.push(sub);
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.required, ]],
name: [this.o.name, [Validators.required, ]],

    });
  }

  resetForm() {
    this.o = new Role();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(e => {
      e.unsubscribe();
    });
  }

}
