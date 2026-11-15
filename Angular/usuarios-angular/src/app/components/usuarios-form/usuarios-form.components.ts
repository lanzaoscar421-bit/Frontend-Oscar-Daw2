import { Component, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { Iusuario } from './../../interfaces/iusuario.interface';
import { UsuariosServices } from './../../services/usuarios-services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-usuarios-form',
  styleUrl: './usuarios-form.components.css',
  templateUrl: './usuarios-form.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class UsuariosFormComponents {

  usuariosForm: FormGroup;


  UsuariosServices = inject(UsuariosServices);

  constructor() {

    this.usuariosForm = new FormGroup({
      id: new FormControl(null, []),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    effect(() => {

      const usuario = this.UsuariosServices.usuarioToEdit ();
      if (usuario) {
        this.usuariosForm.patchValue(usuario);
      }

    });

  }

    checkControl(controlName: string, validator: string): boolean {
        const control = this.usuariosForm.get(controlName);
        return !!control?.hasError(validator) && !!control?.touched;
    }

  getDataForm() {

    let usuario: Iusuario = this.usuariosForm.value as Iusuario;

    if (usuario.id !== null && usuario.id !== undefined) {

      this.UsuariosServices.updateUsuario(usuario);
    } else {
      usuario.id = -1;
      this.UsuariosServices.addUsuario(usuario);
    }


    this.usuariosForm.reset();
  }
}
