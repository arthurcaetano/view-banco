import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { Banco } from '../../../models/banco';
import { DialogoProvider } from '../../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-editar-banco',
  templateUrl: 'editar-banco.html',
})
export class EditarBancoPage {

  banco: Banco = new Banco();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    public dialogo: DialogoProvider,
    public events: Events) {

    this.banco = this.navParams.get('Banco');

    if (!this.banco) this.banco = new Banco();
  }

  cancelar() {

    this.viewController.dismiss();
  }

  gravar() {

    if (!this.banco.Descricao) {

      this.dialogo.exibaToastAlerta('Informe a descrição do banco!');

      return;
    }

    if (!this.banco.Agencia) {

      this.dialogo.exibaToastAlerta('Informe a agência do banco!');

      return;
    }

    this.events.publish('home:adicionarBanco', this.banco);

    this.viewController.dismiss();
  }

}
