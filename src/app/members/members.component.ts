import { Component } from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent {

  isUserAdmin= true;
  users:any;

  deleteUser(id:any){

  }

}
