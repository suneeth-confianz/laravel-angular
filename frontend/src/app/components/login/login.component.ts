import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../services/backend-connector.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private Token:TokenService,
    private router:Router,
    private Auth:AuthService
  ) { }
  
  onSubmit() {
    this.BackendConnector.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handlError(error)
    )
  }

  handleResponse(data){
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile')
  }

  handlError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
