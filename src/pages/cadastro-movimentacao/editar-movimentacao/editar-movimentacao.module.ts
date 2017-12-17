import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarMovimentacaoPage } from './editar-movimentacao';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  declarations: [
    EditarMovimentacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarMovimentacaoPage),
    PipesModule
  ],
})
export class EditarMovimentacaoPageModule {}
