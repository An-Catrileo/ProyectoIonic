import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage {
  cartItems = [
    { id: 1, name: 'Game 1', quantity: 1 },
    { id: 2, name: 'Game 2', quantity: 2 },
    // Add more items as needed
  ];
  constructor() {}
}
