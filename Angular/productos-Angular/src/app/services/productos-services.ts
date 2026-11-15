import { Service, signal } from '@angular/core';
import { Iproductos } from '../interfaces/iproductos.interface';


@Service()
export class ProductosServices {

    private arrProductos: Iproductos[];
    private url: string = 'https://peticiones.online/api/products';
    private id: number;
    productoToEdit = signal<Iproductos | null>(null);

    constructor() {

        this.arrProductos = [];
        this.connectProductos();
        this.id = this.arrProductos.length;
    }


    getAllProductos(): Iproductos[] {
        return this.arrProductos;
    }


    // Esto para Objetos paginados
    private connectProductos() {
        fetch(this.url)
            .then(response => response.json())
            .then(datos => {
                datos.results.forEach((element: any, index: number) => {
                    let producto: Iproductos = element as Iproductos;
                    producto.id = index;
                    this.arrProductos.push(producto);
                });
                this.id = this.arrProductos.length;
                console.log(this.arrProductos);
            })
            .catch(error => console.error('error fetch', error));
    }


    addProducto(producto: Iproductos): void {

        if (!this.arrProductos.includes(producto) && producto != null) {
            producto.id = this.id;
            this.arrProductos.push(producto);
            this.id++;
        }

    }

    deleteProductoByTitle(miProducto: Iproductos) {


        let i = this.arrProductos.findIndex(producto => producto.name == miProducto.name);
        if (i != -1 && i >= 0 && i < this.arrProductos.length) {
            this.arrProductos.splice(i, 1);
        }

    }


    updateProducto(producto: Iproductos): void {
        let i = this.arrProductos.findIndex(p => p.id === producto.id);
        if (i != -1) {
            this.arrProductos[i] = { ...this.arrProductos[i], ...producto };
        }

    }
}

