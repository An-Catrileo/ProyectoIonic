import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor() {}

  onLogin() {
    this.loading = true;
    // Lógica de autenticación de prueba o mensaje de login
    setTimeout(() => {
      console.log('Login button clicked');
      this.loading = false;
    }, 2000); // Simula una espera de 2 segundos para la autenticación
  }
}