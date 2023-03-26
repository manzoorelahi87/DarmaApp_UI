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

  errmsg: any;
  errmsgshow = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 2;
  tableSizes: any = [3, 6, 9, 12];

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

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllUsers();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllUsers();
  }

}
