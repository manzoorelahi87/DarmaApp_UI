import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbInputDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { MemberService } from '../member.service';

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
  disableCreateButton;
  disableUpdateButton;
  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;
  loader = false;



  profileForm = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'address': new FormControl(''),
    'associationUnit': new FormControl('', Validators.required),
    'mobileNo': new FormControl('', [Validators.required, Validators.maxLength(10)]),
    'landlineCode': new FormControl(''),
    'landlineNo': new FormControl(''),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'dateOfBirth': new FormControl(''),
    'spouseName': new FormControl(''),
    'spouseDOB': new FormControl(''),
    'maleChildren': new FormControl(''),
    'femaleChildren': new FormControl(''),
    'profilePhoto': new FormControl(''),
    'notes': new FormControl(''),
  });

  @ViewChild('dp1') dp1: NgbInputDatepicker;

  constructor(private router: ActivatedRoute, private memberService: MemberService) {
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
          this.getID = res.data[0].id;
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
      this.memberService.createProfile(this.profileForm.value).subscribe((res) => {
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
    console.log( this.profileForm.valid)
    console.log(this.profileForm.get('firstName').valid)
    console.log(this.profileForm.get('lastName').valid)
    console.log(this.profileForm.get('mobileNo').valid)
    console.log(this.profileForm.get('email').valid)
    console.log(this.profileForm.get('associationUnit').valid)
   
    if (this.profileForm.valid) {
      this.loader = true;
      this.memberService.updateProfile(this.profileForm.value, this.getID).subscribe((res) => {
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

  resetProfile() {
    this.profileForm.reset();
  }

  userPatchValue(id: any) {
    this.loader = true;
    this.memberService.getMyProfile(id).subscribe((res) => {
      this.loader = false;
      this.profileForm.patchValue({
        'firstName': res.data[0].firstname,
        'lastName': res.data[0].lastname,
        'address': res.data[0].mobile,
        'associationUnit': res.data[0].unit,
        'mobileNo': res.data[0].mobile,
        'landlineCode': res.data[0].landcode,
        'landlineNo': res.data[0].landline,
        'email': res.data[0].email,
        'dateOfBirth': res.data[0].dob,
        'spouseName': res.data[0].spouse,
        'spouseDOB': res.data[0].sdob,
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
