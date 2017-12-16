import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'CadastroBancoPage';
  tab2Root = 'CadastroContaPage';
  tab3Root = ContactPage;

  constructor() {

  }
}
