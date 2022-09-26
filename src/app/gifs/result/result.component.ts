import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent {
  get results() {
    return this.gifsService.results;
  }

  constructor(private gifsService: GifsService){}
}
