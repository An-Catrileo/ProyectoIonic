import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service'; // Cambio de ServiciodbService a DatabaseService

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

  constructor(private dbService: DatabaseService) { } // Cambio de ServiciodbService a DatabaseService

  async ngOnInit() {
    await this.dbService.initDB();
  }

  async addClient(event: Event){ // Cambio de addStudent a addClient
    event.preventDefault();

    await this.dbService.addItem(this.rut, this.nombre, this.apellidop, this.apellidom, this.correo);

    this.rut = '';
    this.nombre = '';
    this.apellidop = '';
    this.apellidom = '';
    this.correo = '';
  }

}
