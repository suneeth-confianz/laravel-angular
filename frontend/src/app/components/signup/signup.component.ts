import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../services/backend-connector.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';

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

  constructor(
    private BackendConnector:BackendConnectorService,
    private Token:TokenService,
    private router:Router
  ) { }

  onSubmit() {
    this.BackendConnector.signup(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handlError(error)
    )
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile')
  }

  handlError(error) {
    this.error = error.error.errors;
  }

  ngOnInit() {
  }

}
