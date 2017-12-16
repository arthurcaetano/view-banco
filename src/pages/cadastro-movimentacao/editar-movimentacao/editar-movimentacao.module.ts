import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarMovimentacaoPage } from './editar-movimentacao';

@NgModule({
  declarations: [
    EditarMovimentacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarMovimentacaoPage),
  ],
})
export class EditarMovimentacaoPageModule {}
