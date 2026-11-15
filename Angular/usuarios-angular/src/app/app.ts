import { UsuariosServices } from './services/usuarios-services';
import { Component, inject, signal } from '@angular/core';
import { UsuariosListComponents } from './components/usuarios-list/usuarios-list.components';
import { UsuariosFormComponents } from './components/usuarios-form/usuarios-form.components';


@Component({
  imports: [UsuariosListComponents, UsuariosFormComponents],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('usuarios-angular');

  usuariosServices = inject(UsuariosServices);

  
}
