import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Banco } from '../../models/banco';

const urlApi = 'http://localhost:12026/tarefas';

@Injectable()
export class ComunicacaoBancoProvider {

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

        return this.mapeieBanco(resp);
      });
  }

  remover(banco: Banco) {

    let servico = `${urlApi}/${banco.Id}`;

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .delete(servico)
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  adicionar(banco: Banco) {

    if (!banco.Id || banco.Id == 0) {

      this.dialogo.exibaLoadingPadrao();

      return this.http
        .post(urlApi, {
          id: banco.Id,
          descricao: banco.Descricao,
          agencia: banco.Agencia
        })
        .toPromise()
        .then(resp => {

          this.dialogo.removaLoading();

          return resp;
        });
    } else {

      return this.atualizar(banco);
    }
  }

  atualizar(banco: Banco) {

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .put(urlApi, {
        id: banco.Id,
        descricao: banco.Descricao,
        agencia: banco.Agencia
      })
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  mapeieBanco(resp) {

    let bancos: Banco[] = [];

    resp.forEach(t => {

      bancos.push({
        Id: t.id,
        Descricao: 'Banco',
        Agencia: 123
      });
    });

    return bancos;
  }
}
