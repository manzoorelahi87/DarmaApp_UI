import { Component, OnInit } from '@angular/core';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  isUserAdmin = true;
  users: any;
  constructor(private memberService: MemberService) {

  }
  ngOnInit() {
   this.getAllUsers();
  }

  deleteUser(id: any) {
    this.memberService.deleteProfile(id).subscribe((res)=>{
      console.log(res.message);
    });
    this.getAllUsers();
  }

  getAllUsers(){
    this.memberService.getMemberDetails().subscribe((res) => {
      this.users = res.data;
      console.log(res.message);
    });
  }

}
