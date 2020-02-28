import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from 'src/app/Services/backend-connector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation:null
  }

  public error = [];

  constructor(private BackendConnector:BackendConnectorService) { }

  onSubmit() {
    this.BackendConnector.signup(this.form).subscribe(
      data => console.log(data),
      error => this.handlError(error)
    )
  }

  handlError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
