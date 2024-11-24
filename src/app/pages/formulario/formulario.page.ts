import { Component, OnInit } from '@angular/core';
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

  constructor(private dbService: ServiciodbService) { }


  async ngOnInit() {
    await this.dbService.initDB();
  }


  async addStudent(event: Event){
    event.preventDefault();

    await this.dbService.addItem(this.rut, this.nombre, this.apellidop, this.apellidom, this.correo);

    this.rut = '';
    this.nombre = '';
    this.apellidop = '';
    this.apellidom = '';
    this.correo = '';
  }
}
