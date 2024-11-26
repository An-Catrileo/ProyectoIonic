import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';

type GameType = {
  id?: Number;
  title?: string;
  description?: string;
  thumbnail?: string;
}

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.page.html',
  styleUrls: ['./detalle-juego.page.scss'],
})
export class DetalleJuegoPage implements OnInit {
  game: GameType = {}

  constructor(private route: ActivatedRoute, private gamesService: GamesService) {}

  ngOnInit() {
    const gameId = +(this.route.snapshot.paramMap.get('id') || 0);
    this.gamesService.getGameById(gameId).subscribe(
      (data: any) => {
        this.game = data
      },
      (error: any) => {
        console.log('Error al obtener los detalles del juego:', error);
        this.game = {title: 'Juego no encontrado'};
      }
    );
  }
}
