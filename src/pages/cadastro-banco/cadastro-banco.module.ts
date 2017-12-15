import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroBancoPage } from './cadastro-banco';

@NgModule({
  declarations: [
    CadastroBancoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroBancoPage),
  ],
})
export class CadastroBancoPageModule {}
