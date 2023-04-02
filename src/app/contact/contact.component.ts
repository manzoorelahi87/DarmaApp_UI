import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from './email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private emailService: EmailService) {

  }

  errMsg: any;
  errMsgShow = false;
  successMsg: any;
  successMsgShow = false;

  contactForm = new FormGroup({
    'name': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'contact': new FormControl('', Validators.required),
    'message': new FormControl('', Validators.required),
  });

  ngOnInit(): void { }

  contactSubmit() {
    if (this.contactForm.valid) {
      this.emailService.SendEmail(this.contactForm.value).subscribe((res) => {
        this.successMsgShow = true;
        this.successMsg = "Email send successfully!"
        this.contactForm.reset();
      });
    }
    else {
      this.errMsgShow = true;
      this.errMsg = "All fields are mandatory!"
    }
  }

  dismissMsg(){
    this.errMsgShow = false;
    this.successMsgShow = false;
  }

}
