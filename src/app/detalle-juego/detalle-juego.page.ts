import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.page.html',
  styleUrls: ['./detalle-juego.page.scss'],
})
export class DetalleJuegoPage {
  name: string;
  image: string;

  constructor(private route: ActivatedRoute) {
    const games: { [key: number]: { name: string; image: string } } = {
      1: { name: 'Zelda Tears Of The Kingdom', image: '../../assets/images/zeldaTOTK.jpg' },
      2: { name: 'Mario Wonder', image: '../../assets/images/marioWonder.jpg' },
    };
    const gameId = +(this.route.snapshot.paramMap.get('id') || 0);
    this.name = games[gameId]?.name || 'Juego no encontrado';
    this.image = games[gameId]?.image || '';
  }
}
