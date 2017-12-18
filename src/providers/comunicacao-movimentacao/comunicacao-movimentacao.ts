import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DialogoProvider } from '../dialogo/dialogo';
import { Movimentacao } from '../../models/movimentacao';

const urlApi = 'http://localhost:12026/tarefas';

@Injectable()
export class ComunicacaoMovimentacaoProvider {

  constructor(
    public http: HttpClient,
    private dialogo: DialogoProvider) {

  }

  obtenha(idConta: number, removerLoading: boolean = true) {

    this.dialogo.exibaLoadingPadrao();

    let servico = `${urlApi}/${idConta}`;
    
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
        id: movimentacao.Id,
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

    resp.movimentacao.forEach(t => {

      //movimentacoes.push();
    });

    return movimentacoes;
  }
}
