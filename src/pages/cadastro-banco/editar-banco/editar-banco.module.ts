import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarBancoPage } from './editar-banco';

@NgModule({
  declarations: [
    EditarBancoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarBancoPage),
  ],
})
export class EditarBancoPageModule {}
