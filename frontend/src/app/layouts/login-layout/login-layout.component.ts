import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  template: `
    <ng-snotify></ng-snotify>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class LoginLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
