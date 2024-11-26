import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciodbService } from 'src/app/services/database.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {
  rut: string = '';
  nombre: string = '';
  apellidop: string = '';
  apellidom: string = '';
  correo: string = '';
  password: string = '';
  loading: boolean = false;
  responseMessage: { success?: string; error?: string } = {};

  constructor(private dbService: ServiciodbService, private router: Router) {}

  async ngOnInit() {
    await this.dbService.initDB();
  }

  async addStudent(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.responseMessage = {}; // Limpiar el mensaje antes de intentar registrar

    try {
      const response = await this.dbService.registerUser(
        this.rut,
        this.nombre,
        this.apellidop,
        this.apellidom,
        this.correo,
        this.password
      );

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
