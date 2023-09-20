import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private router:Router, private service: LoginService) { }
  errmsg:any;
  errmsgshow=false;
  resetPassword: any;

  successMsg: any;
  successMsgShow = false;
  loader = false;
  
 loginForm = new FormGroup({
   email:new FormControl('',Validators.required),
   password:new FormControl('',Validators.required)
 });

  ngOnInit(): void {

  }

  loginSubmit()
  {
    if(this.loginForm.valid)
    {
      this.loader = true;
      this.service.login(this.loginForm.value).subscribe((res)=>{
        this.loader = false;
        if(res.status==true)
        {
          // store data in localStorage
          localStorage.clear();
          localStorage.setItem('token',res.token);
          localStorage.setItem('username',res.result.name);
          localStorage.setItem('email', res.result.email);
          this.router.navigate(['home']).then(()=>{
          window.location.reload();
          });
        }          
        else
        {
            this.errmsgshow=true;
            this.errmsg = res.msg;
        }
      });
      
    }else
    {
      this.errmsgshow=true;
      this.errmsg = 'All field required !!';
    }
  }

  dismissMsg() {
    this.errmsgshow = false;
    this.successMsgShow = false;
  }



}
