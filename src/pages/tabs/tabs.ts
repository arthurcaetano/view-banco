import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'CadastroBancoPage';
  tab2Root = 'CadastroContaPage';
  tab3Root = 'CadastroMovimentacaoPage';

  constructor() {

  }
}
