import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  games = [
    { id: 1, name: 'Zelda Tears Of The Kingdom' },
    { id: 2, name: 'Mario Wonder' },
  ];
  searchTerm: string = '';
  filteredGames = [...this.games];

  constructor() {}

  filterGames() {
    if (this.searchTerm.trim()) {
      this.filteredGames = this.games.filter(game =>
        game.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredGames = [...this.games];
    }
  }
}
