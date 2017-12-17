import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movimentacao } from '../../../models/movimentacao';
import { ComunicacaoMovimentacaoProvider } from '../../../providers/comunicacao-movimentacao/comunicacao-movimentacao';
import { DialogoProvider } from '../../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-editar-movimentacao',
  templateUrl: 'editar-movimentacao.html',
})
export class EditarMovimentacaoPage {

  saldo: number = 1234656;

  movimentacao: Movimentacao = new Movimentacao();

  movimentacoes: Movimentacao[] = [{
    Id: 1,
    Data: new Date(),
    Valor: 150,
    Descricao: 'supermercado',
    Tipo: 'Saida',
    Conta: {
      Id: 1,
      Banco: {
        Id: 1,
        Agencia: 123,
        Descricao: 'banco 1'
      },
      Numero: 1234,
      Titular: 'Arthur Caetano'
    }
  }];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dialogo: DialogoProvider,
    private comunicacaoMovimentacao: ComunicacaoMovimentacaoProvider) {
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

}
