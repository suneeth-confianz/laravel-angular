import { Component, OnInit } from '@angular/core';
import { BackendConnectorService } from '../../../services/backend-connector.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };


  constructor(
    private BackendConnector: BackendConnectorService,
    private Notfiy:SnotifyService
  ) {   }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
  }


  onSubmit() {
    this.Notfiy.info('Wait...' ,{timeout:5000})
    this.BackendConnector.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.Notfiy.error(error.error.error)
    );
  }

  handleResponse(res) {
    this.Notfiy.success(res.data,{timeout:0});
    this.form.email = null;
  }

}