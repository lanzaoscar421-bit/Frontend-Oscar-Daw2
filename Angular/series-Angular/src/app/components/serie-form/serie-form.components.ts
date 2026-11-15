import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iserie } from '../../interfaces/iserie.interface';
import { SeriesServices } from '../../services/series-services';

@Component({
    imports: [ReactiveFormsModule],
    selector: 'app-serie-form',
    styleUrl: './serie-form.components.css',
    templateUrl: './serie-form.components.html',
})
export class SerieFormComponents {

    serieForm: FormGroup;
    seriesServices = inject(SeriesServices);
    constructor() {
        this.serieForm = new FormGroup({
            id: new FormControl(null, []),
            title: new FormControl(null, [Validators.required, Validators.minLength(2)]),
            creator: new FormControl(null, [Validators.required, Validators.minLength(3)]),
            rating: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
            dates: new FormControl(null, [Validators.required, Validators.pattern(/^\d{4}(-(\d{4})?)?$/)]),
            image: new FormControl(null, [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
            channel: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        });
        effect(() => {
            const serie = this.seriesServices.serieToEdit();
            if (serie) {
                this.serieForm.patchValue(serie);
            }
        });
    }
    checkControl(controlName: string, validator: string): boolean {
        const control = this.serieForm.get(controlName);
        return !!control?.hasError(validator) && !!control?.touched;
    }

    getDataForm() {
        let serie: Iserie = this.serieForm.value as Iserie;

        if (serie.id !== null && serie.id !== undefined) {
            this.seriesServices.updateSerie(serie);   // editar
        } else {
            serie.id = -1;
            this.seriesServices.addSerie(serie);      // añadir
        }
        this.serieForm.reset();
        this.seriesServices.serieToEdit.set(null);
    }
}


