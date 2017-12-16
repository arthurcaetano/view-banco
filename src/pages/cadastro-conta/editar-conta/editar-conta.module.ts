import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarContaPage } from './editar-conta';

@NgModule({
  declarations: [
    EditarContaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarContaPage),
  ],
})
export class EditarContaPageModule {}
