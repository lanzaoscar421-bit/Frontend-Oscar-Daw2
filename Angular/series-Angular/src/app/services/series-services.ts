import { Service, signal } from '@angular/core';
import { Iserie } from '../interfaces/iserie.interface';

@Service()
export class SeriesServices {

    private arrSeries : Iserie[];
    private url: string = "https://peticiones.online/api/series";
    private id : number;
    serieToEdit = signal<Iserie | null>(null);


    constructor() {
    
        this.arrSeries = [];
        this.connectSeries();
        this.id = this.arrSeries.length;;
    
    }

    getAllSeries() : Iserie[] {
        return this.arrSeries;
    }

private connectSeries() {
    fetch(this.url)
        .then(response => response.json())
        .then(datos => {
            datos.forEach((element: any, index: number) => {
                let serie: Iserie = element as Iserie;
                serie.id = index;
                this.arrSeries.push(serie);
            });
            this.id = this.arrSeries.length;
            console.log(this.arrSeries);
        });
}


    //Añadir una serie

        addSerie(serie: Iserie): void {
        if (!this.arrSeries.includes(serie) && serie != null) {
            serie.id = this.id;
            this.arrSeries.push(serie);
            this.id++;
        }
    }

    //Eliminar una serie  


    deleteSerieByTitle(miSerie: Iserie) {


                let i = this.arrSeries.findIndex(serie => serie.title == miSerie.title);
        if (i != -1 && i >= 0 && i < this.arrSeries.length) {
            this.arrSeries.splice(i, 1);
        }
    }


    updateSerie(serie: Iserie): void {
        let i = this.arrSeries.findIndex(s => s.id === serie.id);
        if (i != -1) {
            this.arrSeries[i] = { ...this.arrSeries[i], ...serie };
        }

    }
}