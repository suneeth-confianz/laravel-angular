import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-layout',
  template: `
    <div class="wrapper">
      <app-navbar></app-navbar>
      <ng-snotify></ng-snotify>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>`,
  styles: []
})
export class HomeLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
