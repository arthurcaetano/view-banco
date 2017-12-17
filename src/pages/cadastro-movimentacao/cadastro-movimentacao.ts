import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conta } from '../../models/conta';

@IonicPage()
@Component({
  selector: 'page-cadastro-movimentacao',
  templateUrl: 'cadastro-movimentacao.html',
})
export class CadastroMovimentacaoPage {

  contas: Conta[] = [{
    Id: 1,
    Numero: 123,
    Titular: 'Arthur Caetano',
    Banco: {
      Id: 1,
      Descricao: 'Itaú',
      Agencia: 1234568
    }
  }];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  movimentar(conta: Conta){

    this.navCtrl.push('EditarMovimentacaoPage', { Conta: conta });
  }

}
