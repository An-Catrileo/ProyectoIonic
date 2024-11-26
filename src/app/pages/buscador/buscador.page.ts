import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  games: any[] = [];
  filteredGames: any[] = [];
  pageSize = 5;
  currentPage = 0;
  totalGames = 0;
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private gamesService: GamesService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.gamesService.getGames().subscribe(
      (data: any[]) => {
        this.games = data;
        this.totalGames = data.length;
        this.updateFilteredGames();
      },
      (error: any) => {
        console.log('Error al obtener los juegos:', error);
      }
    );
  }

  updateFilteredGames() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredGames = this.games.slice(startIndex, endIndex).filter(game =>
      game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updateFilteredGames();
  }

  filterGames() {
    this.currentPage = 0; // Reiniciar a la primera página cuando se realiza una búsqueda
    this.updateFilteredGames();
  }
}
