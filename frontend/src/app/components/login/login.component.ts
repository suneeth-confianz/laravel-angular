import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from 'src/app/Services/backend-connector.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;

  constructor(
    private BackendConnector:BackendConnectorService, 
    private Token:TokenService
  ) { }
  
  onSubmit() {
    this.BackendConnector.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handlError(error)
    )
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
  }

  handlError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
