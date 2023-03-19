import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path:'*', component:HomeComponent},
  {path:'user', component:CreateComponent},
  {path:'user/:id', component:CreateComponent},
  {path:'read', component:ReadComponent},
  {path:'profile', component:ProfileComponent},
  {path:'home', component:HomeComponent},
  {path:'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
