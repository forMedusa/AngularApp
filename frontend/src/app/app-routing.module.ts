import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AllusersComponent } from './allusers/allusers.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component : RegistrationComponent
  },
  {
    path:'users',
    component: AllusersComponent
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
