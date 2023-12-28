import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';

console.log('dashboard');
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    // children:[
    // {path:'login',component:LoginComponent, canActivate:[authGuard]},
    // {path:'signup',component:SignupComponent}
    // ]
  },
];

@NgModule({
  declarations: [DashboardComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
