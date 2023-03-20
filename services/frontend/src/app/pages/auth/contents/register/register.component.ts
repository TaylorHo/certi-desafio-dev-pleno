import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthService } from '@core/services/auth';
import { FormValidationService } from '@core/services/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public showPassword = false;
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private formValidationService: FormValidationService) {
    this.registerForm = this.initRegisterForm;
  }

  private get initRegisterForm() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),

        this.passwordMatchValidator(),
      ]),
    });
  }

  public fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.registerForm);
  }

  public getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.registerForm);
  }

  public onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    }
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.registerForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
