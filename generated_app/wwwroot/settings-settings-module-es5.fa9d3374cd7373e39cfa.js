!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{zwdw:function(e,r,o){"use strict";o.r(r),o.d(r,"SettingsModule",function(){return p});var i,a,u,l=o("ofXK"),c=o("tyNb"),f=o("fXoL"),d=[{path:"",redirectTo:"",pathMatch:"full"},{path:"",component:(i=function(){function e(){n(this,e)}var r,o,i;return r=e,(o=[{key:"ngOnInit",value:function(){}}])&&t(r.prototype,o),i&&t(r,i),e}(),i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=f.Gb({type:i,selectors:[["app-settings"]],decls:1,vars:0,template:function(n,t){1&n&&f.Nb(0,"router-outlet")},directives:[c.i],styles:[""]}),i),children:[{path:"",redirectTo:"user",pathMatch:"full"},{path:"user",loadChildren:function(){return o.e(15).then(o.bind(null,"DAM3")).then(function(n){return n.UserModule})},data:{animation:"user"}},{path:"collaborateur",loadChildren:function(){return o.e(5).then(o.bind(null,"2CEo")).then(function(n){return n.CollaborateurModule})},data:{animation:"collaborateur"}},{path:"planing",loadChildren:function(){return o.e(9).then(o.bind(null,"A3jL")).then(function(n){return n.PlaningModule})},data:{animation:"planing"}}]}],h=((u=function t(){n(this,t)}).\u0275mod=f.Kb({type:u}),u.\u0275inj=f.Jb({factory:function(n){return new(n||u)},imports:[[c.h.forChild(d)],c.h]}),u),p=((a=function t(){n(this,t)}).\u0275mod=f.Kb({type:a}),a.\u0275inj=f.Jb({factory:function(n){return new(n||a)},imports:[[l.c,h]]}),a)}}])}();