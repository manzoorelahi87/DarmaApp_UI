import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  disableProfile = true;
  getParamId: any;
  minDate: any;
  maxDate: any;
  getID: any;
  disableCreateButton = true;
  disableUpdateButton = true;
  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;
  loader = false;
  profileData : any;

  profileForm = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'address': new FormControl(''),
    'associationUnit': new FormControl('', Validators.required),
    'mobileNo': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'landlineCode': new FormControl(''),
    'landlineNo': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'dateOfBirth': new FormControl({ 'year': 2018, 'month': 12, 'day': 12 }),
    'spouseName': new FormControl(''),
    'spouseDOB': new FormControl({ 'year': 2018, 'month': 12, 'day': 12 }),
    'maleChildren': new FormControl(''),
    'femaleChildren': new FormControl(''),
    'profilePhoto': new FormControl(''),
    'notes': new FormControl(''),
  });

  @ViewChild('dp1') dp1: NgbInputDatepicker;

  constructor(private router: ActivatedRoute, private memberService: MemberService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.enableFields();
    this.maxDate = { year: new Date().getFullYear(), month: 12, day: 31 }
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      this.userPatchValue(this.getParamId);
      this.disableUpdateButton = false;
      this.disableCreateButton = true;
    }
    else {

      let email = localStorage.getItem('email');
      if (email !== 'admin@gmail.com') {
        this.loader = true;
        let data = {
          'email': email
        }
        this.memberService.searchMyProfile(data).subscribe((res) => {
          console.log(res);
          this.getID = (res.data[0]?.id) ? res.data[0]?.id : null;
          this.loader = false;
          if (this.getID > 0) {
            this.userPatchValue(this.getID);
            this.disableUpdateButton = false;
            this.disableCreateButton = true;
          }
          else {
            this.disableUpdateButton = true;
            this.disableCreateButton = false;
          }
        }, (err) => {
          this.errMsgShow = true;
          this.errMsg = err;
          this.disableUpdateButton = true;
          this.disableCreateButton = false;
        });
      }
      else {
        this.disableUpdateButton = true;
        this.disableCreateButton = false;
      }
    }

  }

  disableFields() {
    this.profileForm.get('firstName')?.disable();
    this.profileForm.get('lastName')?.disable();
    this.profileForm.get('address')?.disable();
    this.profileForm.get('associationUnit')?.disable();
    this.profileForm.get('mobileNo')?.disable();
    this.profileForm.get('landlineCode')?.disable();
    this.profileForm.get('landlineNo')?.disable();
    this.profileForm.get('email')?.disable();
    this.profileForm.get('dateOfBirth')?.disable();
    this.profileForm.get('spouseName')?.disable();
    this.profileForm.get('spouseDOB')?.disable();
    this.profileForm.get('maleChildren')?.disable();
    this.profileForm.get('femaleChildren')?.disable();
    this.profileForm.get('profilePhoto')?.disable();
    this.profileForm.get('notes')?.disable();
  }

  enableFields() {
    this.profileForm.get('firstName')?.enable();
    this.profileForm.get('lastName')?.enable();
    this.profileForm.get('address')?.enable();
    this.profileForm.get('associationUnit')?.enable();
    this.profileForm.get('mobileNo')?.enable();
    this.profileForm.get('landlineCode')?.enable();
    this.profileForm.get('landlineNo')?.enable();
    this.profileForm.get('email')?.enable();
    this.profileForm.get('dateOfBirth')?.enable();
    this.profileForm.get('spouseName')?.enable();
    this.profileForm.get('spouseDOB')?.enable();
    this.profileForm.get('maleChildren')?.enable();
    this.profileForm.get('femaleChildren')?.enable();
    this.profileForm.get('profilePhoto')?.enable();
    this.profileForm.get('notes')?.enable();
  }

  createProfile() {
    this.enableFields();
  }

  createUser() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      this.loader = true;
      this.createProfileData();
      this.memberService.createProfile(this.profileData).subscribe((res) => {
        this.loader = false;
        this.successMsg = res.message;
        this.successMsgShow = true;
      }, (err) => {
        this.errMsg = err;
        this.errMsgShow = true;
      });
      this.profileForm.reset();
    }
    else {
      this.errMsg = "Fill in all the mandatory fields!";
      this.errMsgShow = true;
    }
  }

  updateProfile() {
    this.enableFields();
  }

  updateUserProfile() {
    // console.log(this.profileForm.get('firstName').valid)
    // console.log(this.profileForm.get('lastName').valid)
    // console.log(this.profileForm.get('associationUnit').valid)
    // console.log(this.profileForm.get('mobileNo').valid)
    // console.log(this.profileForm.get('mobileNo').value.length)
    // console.log(this.profileForm.get('email').valid)
    // console.log(this.profileForm.value)
    // console.log(this.profileForm.valid)

    // const controls = this.profileForm.controls;
    // for (const name in controls) {
    //   if (controls[name].invalid) {
    //     console.log(name)
    //   }
    // }
    // const date = this.profileForm.get('dateOfBirth').value.year + '/' + this.profileForm.get('dateOfBirth').value.month + '/'+ this.profileForm.get('dateOfBirth').value.day
    // console.log(date)

    this.createProfileData();

    
    if (this.profileForm.valid) {
      this.loader = true;
      this.getParamId = this.router.snapshot.paramMap.get('id');
      this.memberService.updateProfile(this.profileData, this.getParamId).subscribe((res) => {
        this.loader = false;
        this.successMsg = res.message;
        this.successMsgShow = true;
      }, (err) => {
        this.errMsg = err;
        this.errMsgShow = true;
      });
    }
    else {
      this.errMsg = "Fill in all the mandatory fields!";
      this.errMsgShow = true;
    }
  }

  createProfileData(){
    this.profileData ={      
      "firstName": this.profileForm.get('firstName').value,
      "lastName": this.profileForm.get('lastName').value,
      "address": this.profileForm.get('address').value,
      "associationUnit": this.profileForm.get('associationUnit').value,
      "mobileNo": this.profileForm.get('mobileNo').value,
      "landlineCode": this.profileForm.get('landlineCode').value,
      "landlineNo": this.profileForm.get('landlineNo').value,
      "email": this.profileForm.get('email').value,
      "dateOfBirth": this.profileForm.get('dateOfBirth').value.year + '-' + this.profileForm.get('dateOfBirth').value.month + '-'+ this.profileForm.get('dateOfBirth').value.day,
      "spouseName": this.profileForm.get('spouseName').value,
      "spouseDOB": this.profileForm.get('spouseDOB').value.year + '-' + this.profileForm.get('spouseDOB').value.month + '-'+ this.profileForm.get('spouseDOB').value.day,
      "maleChildren": this.profileForm.get('maleChildren').value,
      "femaleChildren": this.profileForm.get('femaleChildren').value,
      "profilePhoto": this.profileForm.get('profilePhoto').value,
      "notes": this.profileForm.get('notes').value    
  }
  }

  resetProfile() {
    this.profileForm.reset();
    console.log(this.profileForm.get('dateOfBirth').value);
  }

  formatDate(date: Date) {    
    console.log("Inside format fucntion");    
    return {
      'year': parseInt(moment(date.toLocaleString()).format('YYYY')),
      'month': parseInt(moment(date.toLocaleString()).format('MM')),
      'day': parseInt(moment(date.toLocaleString()).format('DD')) 
    }
  }

  userPatchValue(id: any) {
    this.loader = true;
    this.memberService.getMyProfile(id).subscribe((res) => {
      this.loader = false;
      console.log(res.data[0].sdob);
      console.log(res.data[0].dob);
      const dateFormatted = this.formatDate(res.data[0].dob);
      console.log(dateFormatted);
      this.profileForm.patchValue({
        'firstName': res.data[0].firstname,
        'lastName': res.data[0].lastname,
        'address': res.data[0].mobile,
        'associationUnit': res.data[0].unit,
        'mobileNo': res.data[0].mobile,
        'landlineCode': res.data[0].landcode,
        'landlineNo': res.data[0].landline,
        'email': res.data[0].email,
        'dateOfBirth': this.formatDate(res.data[0].dob),
        'spouseName': res.data[0].spouse,
        'spouseDOB': this.formatDate(res.data[0].sdob),
        'maleChildren': res.data[0].male,
        'femaleChildren': res.data[0].female,
        'notes': res.data[0].notes
      });
    });
  }

  dismissMsg() {
    this.errMsgShow = false;
    this.successMsgShow = false;
  }

}
