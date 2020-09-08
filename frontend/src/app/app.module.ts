import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { HttpClientModule } from '@angular/common/http';
import { BackendConnectorService } from './services/backend-connector.service';
import { TokenService } from './services/token.service';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticateInterceptor } from './interceptor/authenticate.interceptor';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AddIncomeComponent } from './components/income/add-income/add-income.component';
import { ListIncomeComponent } from './components/income/list-income/list-income.component';
import { EditIncomeComponent } from './components/income/edit-income/edit-income.component';
import { MonthDatePickerComponent } from './components/month-date-picker/month-date-picker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    RequestResetComponent,
    ResponseResetComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    FooterComponent,
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    AddIncomeComponent,
    ListIncomeComponent,
    EditIncomeComponent,
    MonthDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    SnotifyModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
    NgbModule
  ],
  providers: [
    BackendConnectorService, 
    TokenService,
    AuthService,
    AfterLoginService,
    BeforeLoginService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticateInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
