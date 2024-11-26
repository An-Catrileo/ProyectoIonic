import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaClientesPage } from './lista-clientes.page';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';

// Definir las rutas locales para esta página
const routes: Routes = [
  {
    path: '',
    component: ListaClientesPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ],
  declarations: [ListaClientesPage],
})
export class ListaClientesPageModule {}
