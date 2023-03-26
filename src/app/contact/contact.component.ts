import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  errmsg: any;
  errmsgshow = false;

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  contactSubmit(){
    console.log(this.contactForm.value);
  }

}
