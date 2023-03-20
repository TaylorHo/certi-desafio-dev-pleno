import { Injectable } from '@angular/core';

/**
 * Serviço responsável pela validação de formulários.
 */
@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  /**
   * Detectar se um campo do formulário tem erros.
   */
  fieldHasError(fieldName: string, targetForm: any): boolean {
    const formField = targetForm?.controls[fieldName];
    return formField?.invalid && formField?.touched ? true : false;
  }

  /**
   * Retornar a mensagem de erro mais apropriada ao erro do campo do formulário.
   */
  getErrorMessage(fieldName: string, targetForm: any): string {
    const formField = targetForm?.get(fieldName);
    const fieldErrors = targetForm?.controls[fieldName].errors;

    return formField?.hasError('required')
      ? 'Campo Obrigatório'
      : formField?.hasError('email')
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

  /**
   * Mostrar mensagem de erro com contador de caracteres necessários.
   */
  private getLengthError(fieldError: any): string {
    return `(${fieldError?.actualLength} / ${fieldError?.requiredLength})`;
  }
}
