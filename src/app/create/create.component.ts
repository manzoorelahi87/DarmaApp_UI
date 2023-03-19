import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  successMsg: any;
  errorMsg: any;
  getParamId: any;
  constructor(private userService: UserService, private router: ActivatedRoute) {

  }

  ngOnInit() {
    //console.log(this.router.snapshot.paramMap.get('id'));
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      this.userService.getSingleData(this.getParamId).subscribe((res) => {
        this.userForm.patchValue({
          'fullname': res.data[0].fullname,
          'email': res.data[0].email,
          'mobile': res.data[0].mobile
        });
      });
    }
  }

  userForm = new FormGroup({
    'fullname': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'mobile': new FormControl('', Validators.required)
  });

  createUser() {

    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe((res) => {
        this.successMsg = res.message;
      }, (err) => {
        this.errorMsg = err;
      }
      );
      this.userForm.reset();
    }
    else {
      this.errorMsg = "All fields are mandatory";
    }

  }

  updateUser() {
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value,this.getParamId).subscribe((res)=>{
        this.successMsg = res.message;
        console.log(res.message)
      });
    }

  }
}
