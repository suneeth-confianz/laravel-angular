import { Component, OnInit } from '@angular/core';
import * as adminlte from 'node_modules/admin-lte/dist/js/adminlte.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
  }

  ngAfterViewInit() {
    $('[data-widget="treeview"]').each(function() {
      adminlte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }

}
