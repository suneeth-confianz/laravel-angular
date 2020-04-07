import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../../services/backend-connector.service';
import { Router } from '@angular/router';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  public error = null;
  public form = {
    name: null,
    address: null,
    city: null,
    pin: null,
    status: null,
    phone: null,
    email: null,
    password: null
  }

  constructor(
    private BackendConnector:BackendConnectorService,
    private router:Router,
    private Notfiy:SnotifyService
  ) { }

  ngOnInit() {

  }

  onSubmit() {
    this.BackendConnector.addUser(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.Notfiy.error("Couldn't create the new memeber")
    )
  }

  handleResponse(data){
    this.router.navigateByUrl('/admin/members');
    this.Notfiy.success("Created new member successfully")
  }

  handlError(error) {
    this.error = error.error.error;
  }


}
