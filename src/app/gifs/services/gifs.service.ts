import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string = 'PICtkuWmH144LG2c0bm0sgRmQgYUAibn';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private _searchHistory: string[] = [];

  public results: Gif[] = [];

  get searchHistory() {
    return [...this._searchHistory];
  }

  constructor(private http: HttpClient) {
    this._searchHistory =
      JSON.parse(localStorage.getItem('searchHistory')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._searchHistory.includes(query)) {
      this._searchHistory.unshift(query);
      this._searchHistory = this._searchHistory.splice(0, 10);

      localStorage.setItem(
        'searchHistory',
        JSON.stringify(this._searchHistory)
      );
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe((resp) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
