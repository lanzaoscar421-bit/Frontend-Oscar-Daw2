import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

// Campo: sin espacios
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  return /\s/.test(control.value) ? { sinEspacios: true } : null;
}

// Campo: fecha no futura
export function fechaNoFutura(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  return new Date(control.value) > new Date() ? { fechaFutura: true } : null;
}

// Grupo: password y repeat iguales
export function passwordsIguales(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const repeat = group.get('repeat')?.value;
  return pass === repeat ? null : { noCoinciden: true };
}

// Asíncrono: simula comprobar en servidor si el username está libre
export function usernameLibre(): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> =>
    new Promise(resolve =>
      setTimeout(() => resolve(control.value === 'admin' ? { usernameOcupado: true } : null), 500)
    );
}