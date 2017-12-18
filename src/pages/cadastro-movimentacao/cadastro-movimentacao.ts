import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { ComunicacaoContaProvider } from '../../providers/comunicacao-conta/comunicacao-conta';

@IonicPage()
@Component({
  selector: 'page-cadastro-movimentacao',
  templateUrl: 'cadastro-movimentacao.html',
})
export class CadastroMovimentacaoPage {

  contas: Conta[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private comunicacaoConta: ComunicacaoContaProvider) {
  }

  ionViewDidEnter() {

    this.comunicacaoConta
      .obtenha()
      .then(contas => {

        this.contas = contas;
      });  
  }

  movimentar(conta: Conta){

    this.navCtrl.push('EditarMovimentacaoPage', { Conta: conta });
  }

}
