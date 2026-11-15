import { ChangeDetectionStrategy,Component, inject,Input } from '@angular/core';
import { ProductosServices } from '../../services/productos-services';
import { Iproductos } from '../../interfaces/iproductos.interface';

@Component({
  imports: [],
  selector: 'app-productos-card',
  styleUrl: './productos-card.components.css',
  templateUrl: './productos-card.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductosCardComponents {

  @Input() miProducto !: Iproductos;

  productosServices = inject(ProductosServices);


  deleteProducto(miProducto: Iproductos){
    this.productosServices.deleteProductoByTitle(miProducto)
  }

  updateProducto(miProducto: Iproductos){

    this.productosServices.productoToEdit.set(miProducto);
  }


}
