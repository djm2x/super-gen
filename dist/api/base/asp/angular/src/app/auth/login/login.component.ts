import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/models';
import { UowService } from 'src/app/services/uow.service';
import { SessionService } from 'src/app/shared';
import { SnackbarService } from 'src/app/shared/snakebar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  // animations: anime
})
export class LoginComponent implements OnInit, OnDestroy {
  // for test
  displayedColumns: string[] = ['email', 'password', 'profil'];
  dataSource = [
    { email: 'mourabit@angular.io', password: '123', profil: 'Administrateur' },
    { email: 'mehdi@angular.io', password: '123', profil: 'Central' },
    { email: 'soufiane@angular.io', password: '123', profil: 'Point focal' },
    { email: 'ahmed@angular.io', password: '123', profil: 'Metier' },
  ];

  // end test
  myForm: FormGroup;
  o = new User();
  hide = true;
  constructor(private fb: FormBuilder, private uow: UowService
    , private router: Router, public session: SessionService
    , private snackbar: SnackbarService) { }

  async ngOnInit() {
    // test
    this.o.email = 'dj-m2x@hotmail.com';
    this.o.password = '123';
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      email: [this.o.email, [Validators.required, Validators.email]],
      password: [this.o.password, [Validators.required]],
    });
  }

  get email() { return this.myForm.get('email'); }
  get password() { return this.myForm.get('password'); }

  get emailError() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  get passwordError() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  submit(o: User) {

    this.uow.accounts.login(o).subscribe((r: any) => {

      this.session.doSignIn(r.user, r.token);
      console.log('to dash')
      this.router.navigate(['/dash']);
    });
  }

  resetForm() {
    this.o = new User();
    this.createForm();
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }
}
