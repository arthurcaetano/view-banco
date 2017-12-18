import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Movimentacao } from '../../models/movimentacao';

const urlApi = 'http://localhost:1888/movimentacao';
const urlApiConta = 'http://localhost:1888/contas';

@Injectable()
export class ComunicacaoMovimentacaoProvider {

  constructor(
    public http: HttpClient,
    private dialogo: DialogoProvider) {

  }

  obtenha(idConta: number, removerLoading: boolean = true) {

    this.dialogo.exibaLoadingPadrao();

    let servico = `${urlApiConta}/${idConta}`;

    return this.http
      .get(servico)
      .toPromise()
      .then((resp: any) => {

        if (removerLoading) this.dialogo.removaLoading();

        return this.mapeieMovimentacao(resp);
      });
  }

  adicionar(movimentacao: Movimentacao) {

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .post(urlApi, {
        id: 0,
        idConta: movimentacao.Conta.Id,
        data: movimentacao.Data.toISOString(),
        descricao: movimentacao.Descricao,
        valor: movimentacao.Valor,
        tipo: movimentacao.Tipo == 'Entrada' ? 1 : 2
      })
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  remover(movimentacao: Movimentacao) {

    let servico = `${urlApi}/${movimentacao.Id}`;

    this.dialogo.exibaLoadingPadrao();

    return this.http
      .delete(servico)
      .toPromise()
      .then(resp => {

        this.dialogo.removaLoading();

        return resp;
      });
  }

  mapeieMovimentacao(resp) {

    let movimentacoes: Movimentacao[] = [];

    resp.movimentacao.forEach(mov => {

      movimentacoes.push({
        Id: mov.id,
        Data: new Date(mov.data),
        Conta: null,
        Descricao: mov.descricao,
        Valor: mov.valor,
        Tipo: mov.tipo == 1 ? 'Entrada' : 'Saída'
      });
    });

    return movimentacoes;
  }
}
