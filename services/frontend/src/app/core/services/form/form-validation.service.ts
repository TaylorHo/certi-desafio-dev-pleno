import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  // FIELD ERROR
  fieldHasError(fieldName: string, targetForm: any): boolean {
    const formField = targetForm?.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }

  // FIELD ERROR MESSAGE
  getErrorMessage(fieldName: string, targetForm: any): string {
    const formField = targetForm?.get(fieldName);
    const fieldErrors = targetForm?.controls[fieldName].errors;

    return formField?.hasError('required')
      ? 'Campo Obrigatório'
      : // JSON SERVER ONLY APPLY EMAIL
      formField?.hasError('email')
      ? 'Nome de usuário precisa ser um email'
      : formField?.hasError('minlength')
      ? `Este campo deve ter pelo menos
      ${this.getLengthError(fieldErrors?.['minlength'])} caracteres`
      : formField?.hasError('maxlength')
      ? `Este campo deve ter no máximo
      ${this.getLengthError(fieldErrors?.['maxlength'])} caracteres`
      : formField?.hasError('mismatch')
      ? 'As senhas não conferem'
      : 'Erro desconhecido';
  }

  // MAKE LENGTH ERRORS SHORTER
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
