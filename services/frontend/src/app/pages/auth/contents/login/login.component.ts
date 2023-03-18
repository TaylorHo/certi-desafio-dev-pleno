import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth';
import { FormValidationService } from '@core/services/form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public showPassword = false;
  // INIT LOGIN FORM DIRECTLY
  public loginForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)]),
    ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
      ]),
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private formValidationService: FormValidationService,
  ) {}

  // FIELD ERROR
  public fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.loginForm);
  }

  // FIELD ERROR MESSAGE
  public getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.loginForm);
  }

  // SUBMIT LOGIN FORM
  public onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
