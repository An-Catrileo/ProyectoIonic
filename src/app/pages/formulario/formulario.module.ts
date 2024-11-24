import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../material.module';
import { FormularioPageRoutingModule } from './formulario-routing.module';
import { FormularioPage } from './formulario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    FormularioPageRoutingModule
  ],
  declarations: [FormularioPage]
})
export class FormularioPageModule {}
