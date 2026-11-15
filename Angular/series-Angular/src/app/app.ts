import { Component, inject,signal } from '@angular/core';
import { SeriesServices } from './services/series-services';
import { SerieListComponents } from './components/serie-list/serie-list.components';
import { SerieFormComponents } from './components/serie-form/serie-form.components';

@Component({
  imports: [SerieListComponents, SerieFormComponents],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('series-Angular');


  //Ya tendria los datos de la Api
  seriesServices = inject(SeriesServices);
}
