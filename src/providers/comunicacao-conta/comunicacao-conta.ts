import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Conta } from '../../models/conta';
import { ComunicacaoBancoProvider } from '../comunicacao-banco/comunicacao-banco';
import { Banco } from '../../models/banco';

const urlApi = 'http://localhost:1888/contas';

@Injectable()
export class ComunicacaoContaProvider {

  bancos: Banco[] = [];

  constructor(
    private http: HttpClient,
    private dialogo: DialogoProvider,
    private comunicacaoBanco: ComunicacaoBancoProvider) { }

  obtenha(removerLoading: boolean = true) {

    this.dialogo.exibaLoadingPadrao();

    return this.comunicacaoBanco
      .obtenha(false)
      .then(bancos => {

        this.bancos = bancos;

        return this.http
          .get(urlApi)
          .toPromise()
          .then((resp: any) => {

            if (removerLoading) this.dialogo.removaLoading();

            return this.mapeieConta(resp);
          });
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
          id: 0,
          titular: conta.Titular,
          numero: conta.Numero,
          cpfCnpj: "73609542829",
          tipoConta: 1,
          tipoPessoa: 1,
          idBancoAgencia: conta.Banco.Id,
          movimentacao: []
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

    let servico = `${urlApi}/${conta.Id}`;

    return this.http
      .get(servico)
      .toPromise()
      .then((resp: any) => {

        resp.titular = conta.Titular;
        resp.numero = conta.Numero;

        return this.http
          .put(urlApi, resp)
          .toPromise()
          .then(resp => {

            this.dialogo.removaLoading();

            return resp;
          });
      });
  }

  mapeieConta(resp) {

    debugger;

    let contas: Conta[] = [];

    resp.forEach(t => {

      let saldo: number = 0;

      t.movimentacao.forEach(mov => {
        if (mov.tipo == 1) {
          saldo += mov.valor;
        } else {
          saldo -= mov.valor;
        }
      });

      contas.push({
        Id: t.id,
        Titular: t.titular,
        Numero: t.numero,
        Banco: this.bancos.find(b => b.Id == t.idBancoAgencia),
        Saldo: saldo
      });
    });

    return contas;
  }

}
