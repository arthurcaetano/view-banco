import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Banco } from '../../models/banco';

const urlApi = 'http://localhost:1888/bancos';

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
          nome: banco.Descricao,
          agencias: [{
            id: 0,
            idBanco: 0,
            codigo: banco.Agencia
          }]
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

    let servico = `${urlApi}/${banco.Id}`;

    return this.http
      .get(servico)
      .toPromise()
      .then((resp: any) => {

        debugger;
        let agencia = resp.agencias[0];

        return this.http
          .put(urlApi, {
            id: banco.Id,
            nome: banco.Descricao,
            agencias: [{
              id: agencia.id,
              idBanco: banco.Id,
              codigo: banco.Agencia
            }]
          })
          .toPromise()
          .then(resp => {

            this.dialogo.removaLoading();

            return resp;
          });
      });
  }

  mapeieBanco(resp) {

    let bancos: Banco[] = [];

    resp.forEach(t => {

      let agencia = t.agencias[0];

      bancos.push({
        Id: t.id,
        Descricao: t.nome,
        Agencia: agencia ? agencia.codigo : 0
      });
    });

    return bancos;
  }
}
