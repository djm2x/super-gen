import { UowService } from 'src/app/services/uow.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Blog } from 'src/app/models/models';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  o: Blog;
  title = '';
  users = this.uow.users.get();
categorys = this.uow.categorys.get();


  folderToSaveInServer = 'blogs';

  imageUrlTo = new Subject();
imageUrlFrom = new Subject();



  eventSubmitFromParent = new Subject();

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any
    , private fb: FormBuilder, private uow: UowService) { }

  ngOnInit() {
    this.o = this.data.model;
    this.title = this.data.title;
    this.createForm();
    this.imageUrlFrom.subscribe(r => this.myForm.get('imageUrl').setValue(r));


    setTimeout(() => {
       this.imageUrlTo.next(this.o.imageUrl);;

    }, 100);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(o: Blog): void {
    if (o.id === 0) {
      this.uow.blogs.post(o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    } else {
      this.uow.blogs.put(o.id, o).subscribe(r => {
        this.eventSubmitFromParent.next(true);
        this.dialogRef.close(o);
      });
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      id: [this.o.id, [Validators.required, ]],
title: [this.o.title, [Validators.required, ]],
description: [this.o.description, [Validators.required, ]],
imageUrl: [this.o.imageUrl, [Validators.required, ]],
date: [this.o.date, [Validators.required, ]],
idUser: [this.o.idUser, [Validators.required, ]],
idCategory: [this.o.idCategory, [Validators.required, ]],

    });
  }

  resetForm() {
    this.o = new Blog();
    this.createForm();
  }

}
