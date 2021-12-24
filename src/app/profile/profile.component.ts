import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user = {
    name: "Ivan",
    surname: "Ivanovych",
    age: 13,
    email: "customivan@gmail.com"
  }

  public userForm!: FormGroup;
  public edit: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      surname: [this.user.surname, [Validators.required]],
      age: [this.user.age, [Validators.required, Validators.min(6)]],
      email: [this.user.email, [Validators.required, Validators.email]]
    })
  }

  getControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  editProfile() {
    this.edit = true;
  }

  saveProfile() {
    this.edit = false;
    this.user = this.userForm.getRawValue();
  }
}
