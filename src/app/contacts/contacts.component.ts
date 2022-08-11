import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  public contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor(
      private fb: FormBuilder,
  ) { }

  public send(): void {

  }

}
