import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../../services/backend-connector.service';
import { Router } from '@angular/router';
import {User} from "../../../model/User.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private BackendConnector:BackendConnectorService,
    private Notfiy:SnotifyService
  ) { }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['admin/members']);
      return;
    }
    this.editUserForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', Validators.required],
      status: ['', Validators.required],
      phone: ['', Validators.required],
      email: [{value: '', disabled: true}, Validators.required],
      password: [''],
      created_at: [''],
      updated_at: ['']
    });
    this.BackendConnector.getUserById(+userId)
      .subscribe( data => {
        this.editUserForm.setValue(data.data);
      });
  }

  onSubmit() {
    this.BackendConnector.updateUser(this.editUserForm.value)
      .pipe(first())
      .subscribe(
        data => this.handleResponse(data),
        error => this.Notfiy.error("Couldn't update")
      )
  }

  handleResponse(data){
    this.router.navigateByUrl('/admin/members');
    this.Notfiy.success("Updated successfully")
  }
  

}