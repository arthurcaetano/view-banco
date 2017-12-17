import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Banco } from '../../models/banco';
import { ComunicacaoBancoProvider } from '../../providers/comunicacao-banco/comunicacao-banco';

@IonicPage()
@Component({
  selector: 'page-cadastro-banco',
  templateUrl: 'cadastro-banco.html',
})
export class CadastroBancoPage {

  bancos: Banco[] = [];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private dialogo: DialogoProvider,
    private events: Events,
    private comunicacao: ComunicacaoBancoProvider) {

    this.events.subscribe('home:adicionarBanco', (banco: Banco) => {

      this.comunicacao
        .adicionar(banco)
        .then(() => {

          this.carregarBancos();
        });
    });
  }

  ionViewDidEnter() {

    this.carregarBancos();
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

        this.comunicacao
          .remover(banco)
          .then(() => {

            this.bancos = this.bancos.filter(a => a.Id != banco.Id);
          });
      })
      .catch(_ => _);
  }

  private carregarBancos() {

    this.comunicacao
      .obtenha()
      .then(bancos => {
        this.bancos = bancos;
      });
  }
}
