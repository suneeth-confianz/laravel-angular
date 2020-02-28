import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from 'src/app/Services/backend-connector.service';

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

  constructor(private BackendConnector:BackendConnectorService) { }
  
  onSubmit() {
    this.BackendConnector.login(this.form).subscribe(
      data => console.log(data),
      error => this.handlError(error)
    )
  }

  handlError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
