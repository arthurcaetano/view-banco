import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Banco } from '../../models/banco';

@IonicPage()
@Component({
  selector: 'page-cadastro-banco',
  templateUrl: 'cadastro-banco.html',
})
export class CadastroBancoPage {

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
    public modalCtrl: ModalController,
    private dialogo: DialogoProvider,
    private events: Events) {

    this.events.subscribe('home:adicionarBanco', (banco: Banco) => {

      this.bancos = this.bancos.filter(a => a.Id != banco.Id);

      this.bancos.push(banco);
    });
  }

  adicionarBanco() {

    let modal = this.modalCtrl.create('EditarBancoPage', {}, { cssClass: 'modal-banco' });

    modal.present();
  }

  editar(banco: Banco) {

    let modal = this.modalCtrl.create('EditarBancoPage', { Banco: banco }, { cssClass: 'modal-banco' });

    modal.present();
  }

  excluir(banco: Banco) {

    this.dialogo
      .exibaAlertaConfirme('Tem certeza que deseja remover o banco?')
      .then(() => {

        this.bancos = this.bancos.filter(a => a.Id != banco.Id);
      })
      .catch(_ => _);
  }
}
