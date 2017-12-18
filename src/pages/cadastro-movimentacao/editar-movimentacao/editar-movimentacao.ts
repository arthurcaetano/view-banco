import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movimentacao } from '../../../models/movimentacao';
import { ComunicacaoMovimentacaoProvider } from '../../../providers/comunicacao-movimentacao/comunicacao-movimentacao';
import { DialogoProvider } from '../../../providers/dialogo/dialogo';
import { Conta } from '../../../models/conta';

@IonicPage()
@Component({
  selector: 'page-editar-movimentacao',
  templateUrl: 'editar-movimentacao.html',
})
export class EditarMovimentacaoPage {

  movimentacao: Movimentacao = new Movimentacao();
  conta: Conta;
  movimentacoes: Movimentacao[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dialogo: DialogoProvider,
    private comunicacaoMovimentacao: ComunicacaoMovimentacaoProvider) {

      this.conta = this.navParams.get('Conta');
  }

  excluir(movimentacao: Movimentacao) {

    this.dialogo
      .exibaAlertaConfirme('Tem certeza que deseja remover a movimentação?')
      .then(() => {

        this.comunicacaoMovimentacao
          .remover(movimentacao);
      })
      .catch(_ => _);
  }

  movimentar() {

    // if (!this.movimentacao.) {

    //   this.dialogo.exibaToastAlerta('Informe o banco da conta!');

    //   return;
    // }

    this.comunicacaoMovimentacao
      .adicionar(this.movimentacao)
      .then(() => {

        // this.comunicacaoMovimentacao
        //   .obtenha()
        //   .then(movimentacoes => {

        //     this.movimentacoes = movimentacoes;
        //   });

        this.movimentacao = new Movimentacao();
      });
  }
}
