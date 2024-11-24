import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { listaClientesPage } from './lista-clientes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    listaClientesPage
  ],
  declarations: [listaClientesPage]
})
export class VerestudiantesPageModule {}
