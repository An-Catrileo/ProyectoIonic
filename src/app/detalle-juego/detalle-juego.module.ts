import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { DetalleJuegoPage } from './detalle-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: DetalleJuegoPage }]),
    MaterialModule,
  ],
  declarations: [DetalleJuegoPage]
})
export class DetalleJuegoPageModule {}
