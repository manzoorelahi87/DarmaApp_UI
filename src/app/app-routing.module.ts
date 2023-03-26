import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadComponent } from './read/read.component';
import { LoginComponent } from './users/login/login.component';
import { SignupComponent } from './users/signup/signup.component';

const routes: Routes = [
  {path:'*', component:HomeComponent},
  {path:'user', component:CreateComponent},
  {path:'user/:id', component:CreateComponent},
  {path:'read', component:ReadComponent},
  {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'profile/:id', component:ProfileComponent, canActivate:[AuthGuard]},
  {path:'home', component:HomeComponent},
  {path:'contact', component:ContactComponent, canActivate:[AuthGuard]},
  {path:'members', component:MembersComponent, canActivate:[AuthGuard]},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
