import { Component, signal } from '@angular/core';
import { ValidacionesListComponents } from './components/validaciones-list/validaciones-list.components';


@Component({
  imports: [ValidacionesListComponents],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('validaciones-angular');
}
