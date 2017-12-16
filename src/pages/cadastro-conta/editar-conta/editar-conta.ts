import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { DialogoProvider } from '../../../providers/dialogo/dialogo';
import { Conta } from '../../../models/conta';
import { Banco } from '../../../models/banco';

@IonicPage()
@Component({
  selector: 'page-editar-conta',
  templateUrl: 'editar-conta.html',
})
export class EditarContaPage {

  conta: Conta;
  bancoSelecionado: string;

  bancos: Banco[] = [{
    Id: 1,
    Descricao: 'Banco 1',
    Agencia: 123456
  },
  {
    Id: 2,
    Descricao: 'Banco 2',
    Agencia: 123456
  }];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public dialogo: DialogoProvider,
    public events: Events) {

    this.conta = this.navParams.get('Conta');

    if (!this.conta) this.conta = new Conta();
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
