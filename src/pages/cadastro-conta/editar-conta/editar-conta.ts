import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { DialogoProvider } from '../../../providers/dialogo/dialogo';
import { Conta } from '../../../models/conta';
import { Banco } from '../../../models/banco';
import { ComunicacaoBancoProvider } from '../../../providers/comunicacao-banco/comunicacao-banco';

@IonicPage()
@Component({
  selector: 'page-editar-conta',
  templateUrl: 'editar-conta.html',
})
export class EditarContaPage {

  conta: Conta;
  bancoSelecionado: number;
  bancos: Banco[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public dialogo: DialogoProvider,
    public events: Events,
    private comunicacaoBanco: ComunicacaoBancoProvider) {

    this.conta = this.navParams.get('Conta');

    if (!this.conta) this.conta = new Conta();

    this.comunicacaoBanco
      .obtenha()
      .then(bancos => {

        this.bancos = bancos;

        this.bancoSelecionado = this.conta.Banco.Id;
      })
  }

  cancelar() {

    this.viewController.dismiss();
  }

  gravar() {

    if (!this.conta.Titular) {

      this.dialogo.exibaToastAlerta('Informe o titular da conta!');

      return;
    }

    if (!this.conta.Numero) {

      this.dialogo.exibaToastAlerta('Informe o número da conta!');

      return;
    }

    this.events.publish('home:adicionarConta', this.conta);

    this.viewController.dismiss();
  }

}
