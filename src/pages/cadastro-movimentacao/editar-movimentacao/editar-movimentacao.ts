import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Movimentacao } from '../../../models/movimentacao';

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
    Tipo: 'Entrada',
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
    public navParams: NavParams) {
  }

}
