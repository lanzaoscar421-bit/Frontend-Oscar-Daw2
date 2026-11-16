import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { fechaNoFutura, passwordsIguales, sinEspacios, usernameLibre } from './../../validators/validadores';
@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-validaciones-list',
  styleUrl: './validaciones-list.components.css',
  templateUrl: './validaciones-list.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ValidacionesListComponents {

  
  validacionesForm: FormGroup;
  constructor() {
    this.validacionesForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      username: new FormControl('', [Validators.required, sinEspacios], [usernameLibre()]),
      email: new FormControl('', [Validators.required, Validators.email]),
      edad: new FormControl(null, [Validators.required, Validators.min(18), Validators.max(100)]),
      dni: new FormControl('', [Validators.required, Validators.pattern(/^\d{8}[A-Za-z]$/)]),
      telefono: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{8}$/)]),
      web: new FormControl('', Validators.pattern(/^https?:\/\/.+/)),
      fecha: new FormControl('', [Validators.required, fechaNoFutura]),
      categoria: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),
      comentario: new FormControl('', Validators.maxLength(200)),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
      ]),
      repeat: new FormControl('', Validators.required),
      terminos: new FormControl(false, Validators.requiredTrue),
    }, { validators: passwordsIguales });
  }

  checkControl(controlName: string, validator: string): boolean {
    const control = this.validacionesForm.get(controlName);
    return !!control?.hasError(validator) && !!control?.touched;
  }

  getDataForm() {
    console.log(this.validacionesForm.value);
    this.validacionesForm.reset({ terminos: false });
  }
}
