(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{Yj9t:function(t,e,r){"use strict";r.r(e),r.d(e,"AuthModule",function(){return Z});var o=r("ofXK"),i=r("tyNb"),s=r("mrSG"),a=r("3Pt+"),n=r("V2kc"),c=r("AytR"),m=r("fXoL"),l=r("7q3A"),b=r("M0ag"),u=r("0kbX"),d=r("Wp6s"),h=r("r3Nu"),p=r("kmnG"),f=r("qFsG"),g=r("NFeN"),w=r("bTqV");function y(t,e){1&t&&(m.Sb(0,"mat-error"),m.Ac(1,"Email non valide"),m.Rb())}const v=function(){return["/activation"]};let k=(()=>{class t{constructor(t,e,r,o,i,s){this.fb=t,this.uow=e,this.router=r,this.session=o,this.route=i,this.snackBar=s,this.o=new n.f,this.hide=!0,this.isProd=c.a.production,this.code=""}ngOnInit(){return Object(s.a)(this,void 0,void 0,function*(){this.checkActivationStatus(),this.o.email="sa@angular.io",this.o.password="123",this.createForm(),this.code=this.route.snapshot.paramMap.get("code"),this.code&&""!==this.code&&this.submitCodeCommingFromEmail()})}checkActivationStatus(){this.uow.activations.checkActivationStatus().subscribe(t=>{this.isProd&&-1===t.code&&this.router.navigate(["/activation"])})}createForm(){this.myForm=this.fb.group({email:[this.o.email,[a.t.required,a.t.email]],password:[this.o.password,[a.t.required]]})}get email(){return this.myForm.get("email")}get password(){return this.myForm.get("password")}get emailError(){return this.email.hasError("required")?"You must enter a value":this.email.hasError("email")?"Not a valid email":""}get passwordError(){return this.password.hasError("required")?"You must enter a value":""}submit(t){this.uow.accounts.login(t).subscribe(t=>{t.code<0?this.snackBar.notifyAlert(400,t.message):(this.snackBar.notifyOk(200,t.message),this.session.doSignIn(t.user,t.token),this.router.navigate(["/admin"]))})}submitCodeCommingFromEmail(){this.uow.accounts.activeAccount(this.code).subscribe(t=>{t.code<0?this.snackBar.notifyAlert(400,t.message):(this.snackBar.notifyOk(200,t.message),this.session.doSignIn(t.user,t.token),this.router.navigate(["/admin"]))})}resetForm(){this.o=new n.f,this.createForm()}ngOnDestroy(){console.log("ngOnDestroy")}}return t.\u0275fac=function(e){return new(e||t)(m.Mb(a.d),m.Mb(l.a),m.Mb(i.e),m.Mb(b.c),m.Mb(i.a),m.Mb(u.a))},t.\u0275cmp=m.Gb({type:t,selectors:[["app-login"]],decls:29,vars:7,consts:[[1,"mat-elevation-z8","mywith"],[3,"formGroup","ngSubmit"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/logo-mini.png","alt","logo","width","80%",1,"mb-4"],[1,""],["appearance","fill",1,"col-md-12","p-0"],["matInput","","formControlName","email","placeholder","Email address"],[4,"ngIf"],["appearance","fill",1,"col-md-12","p-0","mb-4"],["matInput","","formControlName","password","placeholder","Mot de passe",3,"type"],["matSuffix","",3,"click"],["mat-raised-button","","color","primary","type","submit",1,"col-md-12","mb-2",3,"disabled"],[1,"d-flex","flex-row-reverse","my-2"],[2,"font-size",".8em","color","var(--accent)","cursor","pointer",3,"routerLink"],[1,"d-flex","mt-2","mb-2"],["mat-stroked-button","","color","primary","type","button",2,"width","33%",3,"click"],["mat-stroked-button","","color","accent","type","button",2,"width","33%",3,"click"],["mat-stroked-button","","color","warn","type","button",2,"width","33%",3,"click"]],template:function(t,e){1&t&&(m.Sb(0,"mat-card",0),m.Nb(1,"app-theme"),m.Sb(2,"form",1),m.Zb("ngSubmit",function(){return e.submit(e.myForm.value)}),m.Sb(3,"div",2),m.Nb(4,"img",3),m.Sb(5,"div",4),m.Sb(6,"mat-form-field",5),m.Sb(7,"mat-label"),m.Ac(8,"Email"),m.Rb(),m.Nb(9,"input",6),m.yc(10,y,2,0,"mat-error",7),m.Rb(),m.Sb(11,"mat-form-field",8),m.Sb(12,"mat-label"),m.Ac(13,"Mot de passe"),m.Rb(),m.Nb(14,"input",9),m.Sb(15,"mat-icon",10),m.Zb("click",function(){return e.hide=!e.hide}),m.Ac(16),m.Rb(),m.Rb(),m.Sb(17,"button",11),m.Ac(18,"Connexion"),m.Rb(),m.Sb(19,"div",12),m.Sb(20,"span",13),m.Ac(21,"Activer !"),m.Rb(),m.Rb(),m.Sb(22,"div",14),m.Sb(23,"button",15),m.Zb("click",function(){return e.myForm.get("email").patchValue("sa@angular.io")}),m.Ac(24,"Super admin"),m.Rb(),m.Sb(25,"button",16),m.Zb("click",function(){return e.myForm.get("email").patchValue("admin@angular.io")}),m.Ac(26,"Admin"),m.Rb(),m.Sb(27,"button",17),m.Zb("click",function(){return e.myForm.get("email").patchValue("user@angular.io")}),m.Ac(28,"user"),m.Rb(),m.Rb(),m.Rb(),m.Rb(),m.Rb(),m.Rb()),2&t&&(m.Bb(2),m.jc("formGroup",e.myForm),m.Bb(8),m.jc("ngIf",e.myForm.get("email").invalid),m.Bb(4),m.jc("type",e.hide?"password":"text"),m.Bb(2),m.Cc("",e.hide?"visibility_off":"visibility"," "),m.Bb(1),m.jc("disabled",e.myForm.invalid),m.Bb(3),m.jc("routerLink",m.kc(6,v)))},directives:[d.a,h.a,a.u,a.o,a.h,p.c,p.f,f.b,a.c,a.n,a.g,o.l,g.a,p.g,w.a,i.f,p.b],styles:["h1[_ngcontent-%COMP%]{color:var(--warn)}.mywith[_ngcontent-%COMP%]{margin:0 auto}@media screen and (min-width:600px){.mywith[_ngcontent-%COMP%]{width:25rem}}"]}),t})();function S(t,e){1&t&&(m.Sb(0,"mat-error"),m.Ac(1,"Email non valide"),m.Rb())}function R(t,e){if(1&t&&(m.Sb(0,"mat-error"),m.Ac(1),m.Rb()),2&t){const t=m.dc();m.Bb(1),m.Bc(t.passwordError)}}function E(t,e){if(1&t&&(m.Sb(0,"mat-error"),m.Ac(1),m.Rb()),2&t){const t=m.dc();m.Bb(1),m.Bc(t.checkPasswordError)}}const A=function(){return["/auth/login"]};let B=(()=>{class t{constructor(t,e,r,o,i){this.fb=t,this.uow=e,this.router=r,this.session=o,this.snackBar=i,this.o=new n.f,this.hide=!0,this.hide2=!0,this.checkPassword=new a.e("",[a.t.required])}ngOnInit(){return Object(s.a)(this,void 0,void 0,function*(){this.createForm()})}createForm(){this.myForm=this.fb.group({id:[this.o.id],nom:[this.o.nom],prenom:[this.o.prenom],matricule:[this.o.matricule],email:[this.o.email,[a.t.required,a.t.email]],password:[this.o.password,[a.t.required]],isActive:[this.o.isActive]})}get email(){return this.myForm.get("email")}get password(){return this.myForm.get("password")}get emailError(){return this.email.hasError("required")?"You must enter a value":this.email.hasError("email")?"Not a valid email":""}get passwordError(){return this.password.hasError("required")?"You must enter a value":""}get checkPasswordError(){return this.checkPassword.hasError("required")?"You must enter a value":this.checkPassword.value!==this.password.value?"les mot de pass sont pas les m\xeame":""}submit(t){this.uow.accounts.create("auth/login".replace(/\//g,"%2F"),t).subscribe(t=>{t.code<0?this.snackBar.notifyAlert(400,t.message):(this.snackBar.notifyOk(200,"Lien d'activation a \xe9t\xe9 envoyer a votre email"),this.router.navigate(["/auth"]))})}resetForm(){this.o=new n.f,this.createForm()}}return t.\u0275fac=function(e){return new(e||t)(m.Mb(a.d),m.Mb(l.a),m.Mb(i.e),m.Mb(b.c),m.Mb(u.a))},t.\u0275cmp=m.Gb({type:t,selectors:[["app-create"]],decls:37,vars:12,consts:[[3,"formGroup","ngSubmit"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/logo.png","alt","logo","width","100%",1,"mb-4","mt-3"],[1,""],["appearance","fill",1,"col-md-12","p-0"],["matInput","","formControlName","nom"],["matInput","","formControlName","prenom"],["matInput","","formControlName","email","placeholder","Email address"],[4,"ngIf"],["matInput","","formControlName","password","placeholder","Mot de passe",3,"type"],["matSuffix","",3,"click"],["appearance","fill",1,"col-md-12","p-0","mb-4"],["matInput","","placeholder","R\xe9p\xe9ter le mot de pass",3,"formControl","type"],["mat-raised-button","","color","accent","type","submit",1,"col-md-12","mb-2",3,"disabled"],["mat-raised-button","","color","primary","type","button",1,"col-md-12",3,"routerLink"]],template:function(t,e){1&t&&(m.Sb(0,"form",0),m.Zb("ngSubmit",function(){return e.submit(e.myForm.value)}),m.Sb(1,"mat-card-content",1),m.Nb(2,"img",2),m.Sb(3,"h1"),m.Ac(4,"Bienvenue"),m.Rb(),m.Sb(5,"div",3),m.Sb(6,"mat-form-field",4),m.Sb(7,"mat-label"),m.Ac(8,"Nom"),m.Rb(),m.Nb(9,"input",5),m.Rb(),m.Sb(10,"mat-form-field",4),m.Sb(11,"mat-label"),m.Ac(12,"Prenom"),m.Rb(),m.Nb(13,"input",6),m.Rb(),m.Sb(14,"mat-form-field",4),m.Sb(15,"mat-label"),m.Ac(16,"Email"),m.Rb(),m.Nb(17,"input",7),m.yc(18,S,2,0,"mat-error",8),m.Rb(),m.Sb(19,"mat-form-field",4),m.Sb(20,"mat-label"),m.Ac(21,"Mot de passe"),m.Rb(),m.Nb(22,"input",9),m.Sb(23,"mat-icon",10),m.Zb("click",function(){return e.hide=!e.hide}),m.Ac(24),m.Rb(),m.yc(25,R,2,1,"mat-error",8),m.Rb(),m.Sb(26,"mat-form-field",11),m.Sb(27,"mat-label"),m.Ac(28,"R\xe9p\xe9ter le mot de pass"),m.Rb(),m.Nb(29,"input",12),m.Sb(30,"mat-icon",10),m.Zb("click",function(){return e.hide2=!e.hide2}),m.Ac(31),m.Rb(),m.yc(32,E,2,1,"mat-error",8),m.Rb(),m.Sb(33,"button",13),m.Ac(34,"Inscription"),m.Rb(),m.Sb(35,"button",14),m.Ac(36," Connexion"),m.Rb(),m.Rb(),m.Rb(),m.Rb()),2&t&&(m.jc("formGroup",e.myForm),m.Bb(18),m.jc("ngIf",e.emailError),m.Bb(4),m.jc("type",e.hide?"password":"text"),m.Bb(2),m.Cc("",e.hide?"visibility_off":"visibility"," "),m.Bb(1),m.jc("ngIf",e.passwordError),m.Bb(4),m.jc("formControl",e.checkPassword)("type",e.hide2?"password":"text"),m.Bb(2),m.Cc("",e.hide2?"visibility_off":"visibility"," "),m.Bb(1),m.jc("ngIf",e.checkPassword.touched&&e.checkPasswordError),m.Bb(1),m.jc("disabled",e.myForm.invalid||""!==e.checkPasswordError),m.Bb(2),m.jc("routerLink",m.kc(11,A)))},directives:[a.u,a.o,a.h,d.c,p.c,p.f,f.b,a.c,a.n,a.g,o.l,g.a,p.g,a.f,w.a,i.f,p.b],styles:["h1[_ngcontent-%COMP%]{color:#e85412}"]}),t})(),F=(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=m.Gb({type:t,selectors:[["app-auth"]],decls:3,vars:0,consts:[[1,"row","justify-content-center","align-items-center","m-0","pl-2","pr-2"],[1,"container","justify-content-center","align-items-cente"]],template:function(t,e){1&t&&(m.Sb(0,"div",0),m.Sb(1,"div",1),m.Nb(2,"router-outlet"),m.Rb(),m.Rb())},directives:[i.i],styles:[".row[_ngcontent-%COMP%]{height:100vh;width:100vw}"]}),t})();function C(t,e){1&t&&(m.Sb(0,"mat-error"),m.Ac(1,"Email non valide"),m.Rb())}function I(t,e){if(1&t&&(m.Sb(0,"mat-error"),m.Ac(1),m.Rb()),2&t){const t=m.dc(2);m.Bb(1),m.Bc(t.passwordError)}}function j(t,e){if(1&t){const t=m.Tb();m.Sb(0,"mat-form-field",4),m.Sb(1,"mat-label"),m.Ac(2,"Mot de passe"),m.Rb(),m.Nb(3,"input",13),m.Sb(4,"mat-icon",14),m.Zb("click",function(){m.qc(t);const e=m.dc();return e.hide=!e.hide}),m.Ac(5),m.Rb(),m.yc(6,I,2,1,"mat-error",6),m.Rb()}if(2&t){const t=m.dc();m.Bb(3),m.jc("type",t.hide?"password":"text"),m.Bb(2),m.Cc("",t.hide?"visibility_off":"visibility"," "),m.Bb(1),m.jc("ngIf",t.passwordError)}}function M(t,e){if(1&t&&(m.Sb(0,"mat-error"),m.Ac(1),m.Rb()),2&t){const t=m.dc(2);m.Bb(1),m.Bc(t.checkPasswordError)}}function P(t,e){if(1&t){const t=m.Tb();m.Sb(0,"mat-form-field",15),m.Sb(1,"mat-label"),m.Ac(2,"R\xe9p\xe9ter le mot de pass"),m.Rb(),m.Nb(3,"input",16),m.Sb(4,"mat-icon",14),m.Zb("click",function(){m.qc(t);const e=m.dc();return e.hide2=!e.hide2}),m.Ac(5),m.Rb(),m.yc(6,M,2,1,"mat-error",6),m.Rb()}if(2&t){const t=m.dc();m.Bb(3),m.jc("formControl",t.checkPassword)("type",t.hide2?"password":"text"),m.Bb(2),m.Cc("",t.hide2?"visibility_off":"visibility"," "),m.Bb(1),m.jc("ngIf",t.checkPassword.touched&&t.checkPasswordError)}}const N=function(){return["/auth/create"]},x=function(){return["/auth/login"]};let q=(()=>{class t{constructor(t,e,r,o,i,s){this.fb=t,this.uow=e,this.router=r,this.session=o,this.route=i,this.snackBar=s,this.o=new n.f,this.code="",this.hide=!0,this.hide2=!0,this.checkPassword=new a.e("",[a.t.required]),this.isEmailChecked=!1}ngOnInit(){if(this.code=this.route.snapshot.paramMap.get("code"),this.code){const t=atob(this.code).split("*"),[e,r,o]=t;this.o.email=e,this.isEmailChecked=!0}this.createForm()}createForm(){this.myForm=this.fb.group({email:[this.o.email,[a.t.required,a.t.email]],password:[this.o.password,this.isEmailChecked?[a.t.required]:[]]})}get email(){return this.myForm.get("email")}get password(){return this.myForm.get("password")}get emailError(){return this.email.hasError("required")?"You must enter a value":this.email.hasError("email")?"Not a valid email":""}get passwordError(){return this.password.hasError("required")?"You must enter a value":""}get checkPasswordError(){return this.checkPassword.hasError("required")?"You must enter a value":this.checkPassword.value!==this.password.value?"les mot de pass sont pas les m\xeame":""}sendEmailForResetPassword(t){return Object(s.a)(this,void 0,void 0,function*(){this.uow.accounts.sendEmailForResetPassword(t,"auth%2Freset","fr").subscribe(t=>{-1===t.code?(console.log(t.message),this.snackBar.notifyAlert(400,t.message)):(console.log(t.message),this.snackBar.notifyOk(200,t.message),this.router.navigate(["/auth/login"]))},t=>{console.log(t.error)})})}resetPassword(t){this.uow.accounts.resetPassword({email:this.o.email,password:t}).subscribe(t=>{-1===t.code?console.log("Email Incorrect"):1===t.code&&(console.log(t.message),this.router.navigate(["/auth/login"]))},t=>{console.log(t.error)})}}return t.\u0275fac=function(e){return new(e||t)(m.Mb(a.d),m.Mb(l.a),m.Mb(i.e),m.Mb(b.c),m.Mb(i.a),m.Mb(u.a))},t.\u0275cmp=m.Gb({type:t,selectors:[["app-reset"]],decls:20,vars:10,consts:[[3,"formGroup"],[1,"d-flex","flex-column","justify-content-center","align-items-center"],["src","assets/logo.png","alt","logo","width","100%",1,"mb-4","mt-3"],[1,""],["appearance","fill",1,"col-md-12","p-0"],["matInput","","formControlName","email","placeholder","Email address",3,"readonly"],[4,"ngIf"],["appearance","fill","class","col-md-12 p-0",4,"ngIf"],["appearance","fill","class","col-md-12 p-0 mb-4",4,"ngIf"],["mat-raised-button","","color","primary",1,"col-md-12","mb-2",3,"disabled","click"],["mat-raised-button","","color","accent","type","button",1,"col-md-12",3,"routerLink"],[1,"d-flex","flex-row-reverse","mt-2","mb-2","text-muted"],[2,"cursor","pointer",3,"routerLink"],["matInput","","formControlName","password","placeholder","Mot de passe",3,"type"],["matSuffix","",3,"click"],["appearance","fill",1,"col-md-12","p-0","mb-4"],["matInput","","placeholder","R\xe9p\xe9ter le mot de pass",3,"formControl","type"]],template:function(t,e){1&t&&(m.Sb(0,"form",0),m.Sb(1,"mat-card-content",1),m.Nb(2,"img",2),m.Sb(3,"h3"),m.Ac(4,"VEUILLEZ SAISIR VOTRE ADRESSE EMAIL"),m.Rb(),m.Sb(5,"div",3),m.Sb(6,"mat-form-field",4),m.Sb(7,"mat-label"),m.Ac(8,"Email"),m.Rb(),m.Nb(9,"input",5),m.yc(10,C,2,0,"mat-error",6),m.Rb(),m.yc(11,j,7,3,"mat-form-field",7),m.yc(12,P,7,4,"mat-form-field",8),m.Sb(13,"button",9),m.Zb("click",function(){return e.isEmailChecked?e.resetPassword(e.checkPassword.value):e.sendEmailForResetPassword(e.email.value)}),m.Ac(14," R\xe9initialiser "),m.Rb(),m.Sb(15,"button",10),m.Ac(16," Inscription "),m.Rb(),m.Sb(17,"div",11),m.Sb(18,"span",12),m.Ac(19,"Connexion ?"),m.Rb(),m.Rb(),m.Rb(),m.Rb(),m.Rb()),2&t&&(m.jc("formGroup",e.myForm),m.Bb(9),m.jc("readonly",e.isEmailChecked),m.Bb(1),m.jc("ngIf",e.emailError),m.Bb(1),m.jc("ngIf",e.isEmailChecked),m.Bb(1),m.jc("ngIf",e.isEmailChecked),m.Bb(1),m.jc("disabled",e.myForm.invalid||e.isEmailChecked&&""!==e.checkPasswordError),m.Bb(2),m.jc("routerLink",m.kc(8,N)),m.Bb(3),m.jc("routerLink",m.kc(9,x)))},directives:[a.u,a.o,a.h,d.c,p.c,p.f,f.b,a.c,a.n,a.g,o.l,w.a,i.f,p.b,g.a,p.g,a.f],styles:["h3[_ngcontent-%COMP%]{color:#e85412}"]}),t})();const O=[{path:"",redirectTo:"",pathMatch:"full"},{path:"",component:F,children:[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login/:code",component:k},{path:"login",component:k},{path:"create",component:B},{path:"reset/:code",component:q},{path:"reset",component:q}]}];let G=(()=>{class t{}return t.\u0275mod=m.Kb({type:t}),t.\u0275inj=m.Jb({factory:function(e){return new(e||t)},imports:[[i.h.forChild(O)],i.h]}),t})();var L=r("tk/3");let Z=(()=>{class t{}return t.\u0275mod=m.Kb({type:t}),t.\u0275inj=m.Jb({factory:function(e){return new(e||t)},imports:[[o.c,G,a.i,a.r,L.c,d.e,p.e,f.c,g.b,w.b,h.b]]}),t})()}}]);