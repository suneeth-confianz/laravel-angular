import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ListIncomeComponent } from './components/income/list-income/list-income.component';
import { AddIncomeComponent } from './components/income/add-income/add-income.component';
import { EditIncomeComponent } from './components/income/edit-income/edit-income.component';

const appRoutes: Routes = [

  {
    path: 'admin',                       // {1}
    component: HomeLayoutComponent,
    canActivate: [AfterLoginService],       // {2}
    children: [
      {
        path:'profile',
        component: ProfileComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'members',
        component: ListUserComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'member/add',
        component: AddUserComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'member/edit',
        component: EditUserComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'income',
        component: ListIncomeComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'income/add',
        component: AddIncomeComponent,
        canActivate: [AfterLoginService]
      },
      {
        path:'income/edit',
        component: EditIncomeComponent,
        canActivate: [AfterLoginService]
      }
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent, // {4}
    canActivate: [BeforeLoginService],
    children: [
      {
        path:'login',
        component: LoginComponent,
        canActivate: [BeforeLoginService]
      },
      {
        path:'signup',
        component: SignupComponent,
        canActivate: [BeforeLoginService]
      },
      
      {
        path:'request-password-reset',
        component: RequestResetComponent,
        canActivate: [BeforeLoginService]
      },
      {
        path:'response-password-reset',
        component: ResponseResetComponent,
        canActivate: [BeforeLoginService]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
