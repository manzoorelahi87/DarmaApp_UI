import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  disableProfile = true;
  constructor(){

  }

  ngOnInit(){

    
  
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

createProfile(){

}

}
