import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MemberService } from 'src/app/member.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router, private service: LoginService, private memberService: MemberService) { }
  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;

  signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl(''),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void { }

  signupSubmit() {
    if (this.signupForm.valid) {     
      this.errMsgShow = false;

      // call api signup
      this.service.signup(this.signupForm.value).subscribe((res) => {     
        if (res.status == true) {
          const request ={
            'firstname': this.signupForm.get('name').value,
            'mobile': this.signupForm.get('phone').value,
            'email':  this.signupForm.get('email').value
          }
          this.memberService.createBasicProfile(request).subscribe((response) =>{      
            console.log("API call for basic create");
          });

          this.router.navigate(['login']);
        } else {
          this.errMsgShow = true;
          this.errMsg = res.msg;
        }
      });
    } else {
      this.errMsgShow = true;
      this.errMsg = 'All fields required !!';
    }
  }

  dismissMsg() {
    this.errMsgShow = false;
    this.successMsgShow = false;
  }

}
