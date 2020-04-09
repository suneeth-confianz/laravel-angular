import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from "../../../model/User.model";
import { BackendConnectorService } from '../../../services/backend-connector.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private BackendConnector:BackendConnectorService,
    private router:Router
  ) { }

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }
    
    this.BackendConnector.getUsers()
      .subscribe( data => {
        this.users = data.data.result;  
        this.dtTrigger.next();  
      });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      columnDefs:[{
        "targets": 5,
        "render": function ( data, type, row, meta ) {
          let status = 'Inactive';
          if(type === 'display' && data == 'active') {
            status =  '<i class="fa fa-eye"></i>';
          }
          if(type === 'display' && data == 'disabled') {
            status =  '<i class="fa fa-eye-slash"></i>';
          }
          return status;
        }
      }]      
    };     
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  deleteUser(user: User): void {
    this.BackendConnector.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['/admin/member/edit']);
  };
}