import { Component, effect, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductosServices } from '../../services/productos-services';
import { Iproductos } from '../../interfaces/iproductos.interface';


@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-productos-form',
  styleUrl: './productos-form.components.css',
  templateUrl: './productos-form.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class ProductosFormComponents {

  productoForm : FormGroup;

  productosServices = inject(ProductosServices);

  constructor() {
    this.productoForm = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    active: new FormControl(true, []),
    });
    effect(() => {

      const producto =this.productosServices.productoToEdit();
      if(producto){
        this.productoForm.patchValue(producto);
      }

    });

  }

  checkControl(controlName: string, validator: string): boolean {
        const control = this.productoForm.get(controlName);
        return !!control?.hasError(validator) && !!control?.touched;
    }

  getDataForm(){ 

    let producto:Iproductos = this.productoForm.value as Iproductos;

  

    if(producto.id !== null && producto.id  !== undefined){

      this.productosServices.updateProducto(producto);
    }else{
      producto.id = -1;
      this.productosServices.addProducto(producto);
    }


    this.productoForm.reset();


    this.productosServices.productoToEdit.set(null);

  } 

}



/*   productoForm : FormGroup;

  productosServices = inject(ProductosServices);

  constructor() {
    this.productoForm = new FormGroup({
    id: new FormControl(null, []),
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    category: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    active: new FormControl(true, []),
    });

  }

  getDataForm(){ 

    let producto:Iproductos = this.productoForm.value as Iproductos;

    producto.id = -1;

    this.productosServices.addProducto(producto);


    this.productoForm.reset();

  }  */