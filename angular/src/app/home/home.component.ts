import { Component, OnInit, Inject } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myForm: FormGroup;
  folderToSaveInServer = 'examen';

  isReadyForDownload = false;
  isReadyForUpload = false;
  zipFileName = '';

  myFileTo = new Subject();
  myFileFrom = new Subject();
  //
  eventSubmitFromParent = new Subject();
  eventSubmitFromChild = new Subject();
  constructor(private fb: FormBuilder, private service: HomeService
    , @Inject('BASE_URL') private url: string) { }

  ngOnInit() {
    this.createForm();

    this.myFileFrom.subscribe(r => this.isReadyForUpload = true);

    // setTimeout(() => {
    //   this.myFileTo.next(this.o.myFile);
    // }, 100);
    this.eventSubmitFromChild.subscribe((r: any) => {
      console.log(r)
      this.zipFileName = r.url ;
      this.isReadyForDownload = true;
    } );

  }

  test(lengh: number) {
    for (let index = 0; index < lengh; index++) {
      this.service.test().subscribe(r => console.warn(r));
    }
  }

  createForm() {
    this.myForm = this.fb.group({
      myFile: [''],
    });
  }

  submit(o: any) {
    this.eventSubmitFromParent.next(true);

    // this.http.get(`http://localhost:3000/api/files/`).subscribe(r => {
    //   console.log(r)
    // })

  }

  download() {
    const url = `${this.url}/${this.zipFileName}`;
    window.open(url);
    this.isReadyForDownload = false;
    this.isReadyForUpload = false;
  }


  submit2() {
    this.service.create().subscribe(r => {
      console.log(r);
    });
  }

}
