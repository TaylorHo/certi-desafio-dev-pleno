import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { GlobalDataService } from '@core/services/common';
import { FormValidationService } from '@core/services/form';
import { PROFILE } from '@models/auth';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() userData!: PROFILE;
  readonly userRoles = [
    { val: 1, viewVal: 'Cliente' },
    { val: 2, viewVal: 'Admin' },
    { val: 3, viewVal: 'Super Admin' },
  ];
  currentUser: PROFILE | null = this.globalData.currentUser$.getValue();
  showPassword = false;
  userForm!: FormGroup;
  constructor(private formValidationService: FormValidationService, private globalData: GlobalDataService) {}

  ngOnInit(): void {
    this.userForm = this.inituserForm;
  }

  get getFormData() {
    return { ...this.userForm.value, role: this.userForm.value?.role || 1 };
  }

  private get inituserForm() {
    const passwordValidator = [Validators.required, Validators.minLength(8), Validators.maxLength(30)];
    const passwordConfirmValidator = [...passwordValidator, this.passwordMatchValidator()];

    return new FormGroup({
      name: new FormControl(this.userData?.name || '', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      email: new FormControl(
        {
          value: this.userData?.email || '',
          disabled: this.userData ? true : false,
        },
        [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(30)],
      ),
      role: new FormControl(this.userData?.role || '', []),
      password: new FormControl('', this.userData ? [] : passwordValidator),
      passwordConfirm: new FormControl('', this.userData ? [] : passwordConfirmValidator),
    });
  }

  fieldHasError(fieldName: string): boolean {
    return this.formValidationService.fieldHasError(fieldName, this.userForm);
  }

  getErrorMessage(fieldName: string): string {
    return this.formValidationService.getErrorMessage(fieldName, this.userForm);
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordVal = this.userForm?.get('password')?.value;
      const forbidden = control.value !== passwordVal;
      return forbidden ? { mismatch: true } : null;
    };
  }
}
