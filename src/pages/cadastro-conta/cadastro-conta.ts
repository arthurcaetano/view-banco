import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Conta } from '../../models/conta';
import { Banco } from '../../models/banco';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { ComunicacaoContaProvider } from '../../providers/comunicacao-conta/comunicacao-conta';

@IonicPage()
@Component({
  selector: 'page-cadastro-conta',
  templateUrl: 'cadastro-conta.html',
})
export class CadastroContaPage {

  contas: Conta[] = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private dialogo: DialogoProvider,
    private events: Events,
    private comunicacao: ComunicacaoContaProvider) {

    this.events.subscribe('home:adicionarConta', (conta: Conta) => {

      this.comunicacao
        .adicionar(conta)
        .then(() => {

          this.carregarContas();
        });
    });
  }

  ionViewDidEnter() {

    this.carregarContas();
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

        this.comunicacao
          .remover(conta)
          .then(() => {

            this.contas = this.contas.filter(a => a.Id != conta.Id);
          })
      })
      .catch(_ => _);
  }

  private carregarContas() {

    this.comunicacao
      .obtenha()
      .then(contas => {
        this.contas = contas;
      });
  }
}
