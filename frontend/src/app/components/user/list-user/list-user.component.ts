import { Component, OnInit } from '@angular/core';
import * as adminlte from 'node_modules/admin-lte/dist/js/adminlte.js';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('[data-widget="treeview"]').each(function() {
      adminlte.Treeview._jQueryInterface.call($(this), 'init');
    });
  }
}
