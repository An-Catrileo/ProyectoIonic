import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../material.module';
import { CarritoPage } from './carrito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: CarritoPage }]),
    MaterialModule,
  ],
  declarations: [CarritoPage],
})
export class CarritoPageModule {}
