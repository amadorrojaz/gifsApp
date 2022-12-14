import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  constructor(private gifsService: GifsService) {}

  get searchHistory() {
    return this.gifsService.searchHistory
  }

  search(term: string ){
    this.gifsService.searchGifs(term);
  }
}
