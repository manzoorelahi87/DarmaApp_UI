import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  disableProfile = true;
  getParamId:any;
 
  constructor(private router: ActivatedRoute){

  }

  ngOnInit(){
    this.disableFields();  
    this.getParamId = this.router.snapshot.paramMap.get('id');
    if (this.getParamId) {
      // this.userService.getSingleData(this.getParamId).subscribe((res) => {
      //   this.userForm.patchValue({
      //     'fullname': res.data[0].fullname,
      //     'email': res.data[0].email,
      //     'mobile': res.data[0].mobile
      //   });
      // });
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

disableFields(){
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

enableFields(){
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

createProfile(){
  this.enableFields();
}



createUser(){
console.log(this.profileForm.value);
}

updateProfile(){
  this.enableFields();
}





}
