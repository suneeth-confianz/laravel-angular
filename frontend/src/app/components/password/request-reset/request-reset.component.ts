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
  }

  public error = null;

  constructor(
    private BackendConnector: BackendConnectorService,
    private notify: SnotifyService
  ) { }


  onSubmit() {
    this.BackendConnector.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.notify.error(error.error.error)
    )
  }

  handleResponse(data){
    console.log(data)
  }

  handlError(error) {
    console.log(error.error.error)
    this.error = error.error.error;
  }

  ngOnInit() {
  }

}
