import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  fieldIsRequiredErrorMessage: string = 'This field is required.'
  emailOrPasswordDontMatchErrorMessage = 'Email or password do not match.'
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthorizationService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signIn() {
    if (this.canSignIn()) {
      const signedIn = this.authService.signIn(this.form['email'].value, this.form['password'].value);

      if (!signedIn) {
        this.form['password'].setErrors({ emailOrPasswordDontMatch: true })
      }
    }
  }

  canSignIn() {
    return this.form['email'].value != '' && this.form['password'].value != '';
  }

  get form() {
    return this.signInForm.controls;
  }
}
