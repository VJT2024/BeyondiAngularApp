import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginFormGroup: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    this.loginFormGroup = this.formBuilder.group({
      email: [''],
      password: [
        '',
        [Validators.minLength(8), Validators.pattern(passwordRegex)],
      ],
    });
  }

  submitLoginForm() {
    this.auth.signinUser(
      this.loginFormGroup.value.email,
      this.loginFormGroup.value.password
    );
  }
  newUserRegister() {
    this.router.navigate(['signUp']);
  }
}
