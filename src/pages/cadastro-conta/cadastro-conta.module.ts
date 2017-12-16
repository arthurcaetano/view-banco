import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroContaPage } from './cadastro-conta';

@NgModule({
  declarations: [
    CadastroContaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroContaPage),
  ],
})
export class CadastroContaPageModule {}
