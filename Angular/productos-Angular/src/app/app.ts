import { Component, inject,signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductosServices } from './services/productos-services';
import { ProductosListComponents } from './components/productos-list/productos-list.components';
import { ProductosFormComponents } from './components/productos-form/productos-form.components';


@Component({
  imports: [ProductosListComponents, ProductosFormComponents],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('productos-Angular');


  productosServices = inject(ProductosServices);
}
