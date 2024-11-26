import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://www.freetogame.com/api';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(this.apiUrl+ "/games");
  }
  getGameById(id: Number): Observable<any> {
    return this.http.get(this.apiUrl + "/game?id=" + id);
  }
}
