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
  // SHOW AND HIDE PW FOR USER EXPERIENCE
  public showPassword = false;
  // REGISTER FORM GROUP
  public registerForm: FormGroup;

  constructor(private authService: AuthService, private formValidationService: FormValidationService) {
    // INIT REGISTER FORM
    this.registerForm = this.initRegisterForm;
  }

  // REGISTER FORM PROPERTIES
  private get initRegisterForm() {
    return new FormGroup(
      {
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
      },
      // TODO CAN ACTIVATE FOR BETTER PERFORMANCE
      // { updateOn: 'blur' }
    );
  }

  // FIELD ERROR
  public fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.registerForm);
  }

  // FIELD ERROR MESSAGE
  public getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.registerForm);
  }

  // SUBMIT REGISTER FORM
  public onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value);
    }
  }

  // CUSTOM VALIDATOR
  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.registerForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
