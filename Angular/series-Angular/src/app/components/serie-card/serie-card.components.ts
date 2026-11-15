import { Component, inject,Input } from '@angular/core';
import { Iserie } from '../../interfaces/iserie.interface';
import { SeriesServices } from '../../services/series-services';

@Component({
  imports: [],
  selector: 'app-serie-card',
  styleUrl: './serie-card.components.css',
  templateUrl: './serie-card.components.html',
})
export class SerieCardComponents {

  @Input() miSerie !: Iserie;

  seriesService = inject(SeriesServices);

  deleteSerie(miSerie: Iserie) {
    this.seriesService.deleteSerieByTitle(miSerie);
  }

  updateSerie(miSerie: Iserie) {
    this.seriesService.serieToEdit.set(miSerie);

  }
}

