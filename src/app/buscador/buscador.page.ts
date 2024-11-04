import { Component } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage {
  searchTerm: string = '';
  games = [
    { id: 1, name: 'Zelda Tears Of The Kingdom' },
    { id: 2, name: 'Mario Wonder' },
  ];
  filteredGames = [...this.games];

  constructor() {}

  onSearchChange() {
    this.filteredGames = this.games.filter(game =>
      game.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}