import { ChangeDetectionStrategy,Component , inject} from '@angular/core';
import { SerieCardComponents } from '../serie-card/serie-card.components';
import { SeriesServices } from '../../services/series-services';
import { Iserie } from '../../interfaces/iserie.interface';

@Component({
  imports: [SerieCardComponents],
  selector: 'app-serie-list',
  styleUrl: './serie-list.components.css',
  templateUrl: './serie-list.components.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SerieListComponents {

  seriesArray : Iserie[];

  private seriesService = inject(SeriesServices);

  constructor() {
    
    this.seriesArray = [];

  }

  ngOnInit(): void {

    this.seriesArray = this.seriesService.getAllSeries();
  }
}