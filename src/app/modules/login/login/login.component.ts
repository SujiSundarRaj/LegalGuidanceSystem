import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UserRegistrationService } from 'src/app/core/services/user-registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showErrorMsg = false;
  showLogin = true;
  registerForm: FormGroup;
  constructor(
    private readonly router: Router,
    private fb: FormBuilder,
    private readonly userService: UserRegistrationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.showErrorMsg = false;
    const formValue = this.loginForm.value;
    const user = this.userService.getUser(
      formValue.username.toLowerCase(),
      formValue.password
    );
    if (user) {
      this.userService.setCurrentUser(user);
      this.router.navigate(['search']);
    } else {
      this.showErrorMsg = true;
    }
  }

  register() {
    this.showLogin = false;
  }

  cancel() {
    this.showLogin = true;
  }

  registerUser() {
    const user: User = {
      emailId: this.registerForm.value.email.toLowerCase(),
      password: this.registerForm.value.password,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
    };
    this.userService.addUser(user);
    this.showLogin = true;
  }
}
