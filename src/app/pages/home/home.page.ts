import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';

type GamesType = Array<{
  id?: Number;
  title?: string;
  thumbnail?: string;
}>
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  games: GamesType = [];
  searchTerm: string = '';
  filteredGames = [...this.games];

  constructor(private gameService: GamesService) {}

  ngOnInit() {
    this.gameService.getGames().subscribe(
      (data: any) => {
        console.log(data)
        this.games = data;
        this.games = data.slice(0, 10)
        this.filteredGames = [...this.games];
      },
      (error: any) => {
        console.log("error", error)
      }
    );

  }

  filterGames() {
    if (this.searchTerm.trim()) {
      this.filteredGames = this.games.filter(game =>
        game.title?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredGames = [...this.games];
    }
  }
}
