import { ProductosCardComponents } from './../productos-card/productos-card.components';
import { ChangeDetectionStrategy,Component , inject,  } from '@angular/core';
import { ProductosServices } from '../../services/productos-services';
import { Iproductos } from '../../interfaces/iproductos.interface';

@Component({
  imports: [ProductosCardComponents],
  selector: 'app-productos-list',
  styleUrl: './productos-list.components.css',
  templateUrl: './productos-list.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductosListComponents {


  productosArray: Iproductos[];

  private productosServices = inject(ProductosServices);

  constructor() {
    this.productosArray =[];
  }

  ngOnInit(): void {
  
    this.productosArray = this.productosServices.getAllProductos();
  }

}
