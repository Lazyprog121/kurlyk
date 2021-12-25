import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { DataService } from '../services/data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  requiredErrorMessage: string = 'This field is required.';
  passwordsDontWatchErrorMessage = 'Password and confirm password do not match.';
  userForm!: FormGroup;

  private userCounter: number = 2;

  constructor(private fb: FormBuilder,
    private authService: AuthorizationService,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.createForm();

    this.form['password'].valueChanges.subscribe(_ => {
      this.validatePasswords();
      this.userForm.updateValueAndValidity();
    });

    this.form['confirmPassword'].valueChanges.subscribe(_ => {
      this.validatePasswords();
      this.userForm.updateValueAndValidity();
    })
  }

  createForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      age: [18, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  validatePasswords() {
    if (this.form['password'].touched && this.form['password'].value !== this.form['confirmPassword'].value) {
      this.form['confirmPassword'].setErrors({ passwordsDoNotMatch: true });
      return;
    }

    this.form['confirmPassword'].setErrors(null);
  }

  createUser(): void {
    const user: User = {
      id: this.userCounter,
      name: this.form['name'].value,
      surname: this.form['surname'].value,
      age: this.form['age'].value,
      email: this.form['email'].value,
      password: this.form['password'].value,
    }

    this.userCounter++;

    const id = this.dataService.createUser(user);
    this.router.navigate(['/signin']);
  }

  get form() {
    return this.userForm.controls;
  }
}
