import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  disableProfile = true;
  getParamId: any;

  constructor(private router: ActivatedRoute, private memberService: MemberService) {

  }

  ngOnInit() {
    this.disableFields();
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      this.memberService.getMyProfile(this.getParamId).subscribe((res) => {
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
          'profilePhoto': res.data[0].photo.data[0],
          'notes': res.data[0].notes
        });
      });
    }
  }

  profileForm = new FormGroup({
    'firstName': new FormControl('', Validators.required),
    'lastName': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
    'associationUnit': new FormControl('', Validators.required),
    'mobileNo': new FormControl('', Validators.required),
    'landlineCode': new FormControl('', Validators.required),
    'landlineNo': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'dateOfBirth': new FormControl('', Validators.required),
    'spouseName': new FormControl('', Validators.required),
    'spouseDOB': new FormControl('', Validators.required),
    'maleChildren': new FormControl('', Validators.required),
    'femaleChildren': new FormControl('', Validators.required),
    'profilePhoto': new FormControl('', Validators.required),
    'notes': new FormControl('', Validators.required),
  });

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
    this.memberService.createProfile(this.profileForm.value).subscribe((res) => {
      console.log(res.message);
    });
    this.profileForm.reset();
  }

  updateProfile() {
    this.enableFields();
  }

  updateUserProfile(){
    this.memberService.updateProfile(this.profileForm.value,this.getParamId ).subscribe((res)=>{
      console.log(res.message);
    });
  }

  resetProfile(){
    this.profileForm.reset();
  }

}
