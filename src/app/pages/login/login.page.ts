import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciodbService } from 'src/app/services/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  email: string = '';
  password: string = '';
  loading: boolean = false;
  responseMessage: { success?: string; error?: string } = {};

  constructor(private dbService: ServiciodbService, private router: Router) {}

  async ngOnInit() {
    await this.dbService.initDB();
  }

  async onLogin() {
    this.loading = true;
    this.responseMessage = {}; // Limpiar el mensaje antes de intentar iniciar sesión

    try {
      const response = await this.dbService.loginUser(this.email, this.password);
      if (response.success) {
        this.responseMessage.success = response.success;
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000);
      } else if (response.error) {
        this.responseMessage.error = response.error;
      }
    } catch (error) {
      this.responseMessage.error = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    } finally {
      this.loading = false;
    }
  }
}
