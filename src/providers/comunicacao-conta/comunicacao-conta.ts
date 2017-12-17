import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Conta } from '../../models/conta';

const urlApi = 'http://localhost:12026/tarefas';

@Injectable()
export class ComunicacaoContaProvider {

  constructor(
    private http: HttpClient,
    private dialogo: DialogoProvider) { }

  obtenha(removerLoading: boolean = true) {

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .get(urlApi)
      .toPromise()
      .then((resp: any) => {

        if (removerLoading) this.dialogo.removaLoading();

        return this.mapeieConta(resp);
      });
  }

  remover(conta: Conta) {

    let servico = `${urlApi}/${conta.Id}`;

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .delete(servico)
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  adicionar(conta: Conta) {

    if (!conta.Id || conta.Id == 0) {

      this.dialogo.exibaLoadingPadrao();

      return this.http
        .post(urlApi, {
          id: conta.Id,
        })
        .toPromise()
        .then(resp => {

          this.dialogo.removaLoading();

          return resp;
        });
    } else {

      return this.atualizar(conta);
    }
  }

  atualizar(conta: Conta) {

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .put(urlApi, {
        id: conta.Id,
      })
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  mapeieConta(resp) {

    let contas: Conta[] = [];

    resp.forEach(t => {

      contas.push({
        Id: t.id,
        Titular: 'Titular',
        Numero: 12345,
        Banco: {
          Id: 1,
          Descricao: 'Banco',
          Agencia: 123
        }
      });
    });

    return contas;
  }

}
