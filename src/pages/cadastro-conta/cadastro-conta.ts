import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { Banco } from '../../models/banco';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-cadastro-conta',
  templateUrl: 'cadastro-conta.html',
})
export class CadastroContaPage {

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
    public modalCtrl: ModalController,
    private dialogo: DialogoProvider,
    private events: Events) {

    this.events.subscribe('home:adicionarConta', (conta: Conta) => {

      this.contas = this.contas.filter(a => a.Id != conta.Id);

      this.contas.push(conta);
    });
  }

  adicionar() {

    let modal = this.modalCtrl.create('EditarContaPage', {}, { cssClass: 'modal-conta' });

    modal.present();
  }

  editar(conta: Conta) {

    let modal = this.modalCtrl.create('EditarContaPage', { Conta: conta }, { cssClass: 'modal-conta' });

    modal.present();
  }

  excluir(conta: Conta) {

    this.dialogo
      .exibaAlertaConfirme('Tem certeza que deseja remover a conta?')
      .then(() => {

        this.contas = this.contas.filter(a => a.Id != conta.Id);
      })
      .catch(_ => _);
  }


}
