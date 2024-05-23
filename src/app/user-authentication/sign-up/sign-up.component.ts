import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpFormGroup: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;
    this.signUpFormGroup = this.formBuilder.group({
      email: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(passwordRegex),
        ],
      ],
    });
  }

  submitSignUpForm() {
    console.log(this.signUpFormGroup.value.email);
    this.auth
      .registerUser(
        this.signUpFormGroup.value.email,
        this.signUpFormGroup.value.password
      )
      .subscribe(() => this.loginUser());
  }
  loginUser() {
    this.route.navigate(['']);
  }
}
