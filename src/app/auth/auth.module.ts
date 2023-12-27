import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { authGuard } from '../auth-guard/auth.guard';

const routes: Routes = [
  {path:'',component:AuthComponent, children:[
    {path:'login',component:LoginComponent, canActivate:[authGuard]},
    {path:'signup',component:SignupComponent}
  ]}
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
