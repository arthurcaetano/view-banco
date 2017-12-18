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
  tipoMovimentacao: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private dialogo: DialogoProvider,
    private comunicacaoMovimentacao: ComunicacaoMovimentacaoProvider) {

    this.conta = this.navParams.get('Conta');
  }

  ionViewDidEnter() {

    this.carregarMovimentacoes();
  }

  excluir(movimentacao: Movimentacao) {

    this.dialogo
      .exibaAlertaConfirme('Tem certeza que deseja remover a movimentação?')
      .then(() => {

        this.comunicacaoMovimentacao
          .remover(movimentacao)
          .then(() => {

            this.carregarMovimentacoes();
          });
      })
      .catch(_ => _);
  }

  movimentar() {

    if (!this.movimentacao.Descricao) {

      this.dialogo.exibaToastAlerta('Informe uma descrição!');

      return;
    }

    if (!this.movimentacao.Valor) {

      this.dialogo.exibaToastAlerta('Informe um valor!');

      return;
    }

    if (!this.tipoMovimentacao) {

      this.dialogo.exibaToastAlerta('Informe um tipo de movimentação (Entrada ou Saída)!');

      return;
    }

    this.movimentacao.Conta = this.conta;
    this.movimentacao.Data = new Date();
    this.movimentacao.Tipo = this.tipoMovimentacao == 1 ? 'Entrada' : 'Saida';
    this.movimentacao.Valor = new Number(this.movimentacao.Valor.toString().replace(',', '.')) as number;

    this.comunicacaoMovimentacao
      .adicionar(this.movimentacao)
      .then(() => {

        this.carregarMovimentacoes();

        this.movimentacao = new Movimentacao();
        this.movimentacao.Descricao = '';
        this.movimentacao.Valor = null;
      });
  }

  private carregarMovimentacoes() {

    this.comunicacaoMovimentacao
      .obtenha(this.conta.Id)
      .then(movimentacoes => {

        this.movimentacoes = movimentacoes;
        this.conta.Saldo = 0;

        this.movimentacoes.forEach(mov => {
          if (mov.Tipo == 'Entrada') {
            this.conta.Saldo += mov.Valor;
          } else {
            this.conta.Saldo -= mov.Valor;
          }
        });
      });
  }
}
