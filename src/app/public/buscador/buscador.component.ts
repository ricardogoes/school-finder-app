import { Component } from "@angular/core";
import { Observable, map, catchError, EMPTY } from "rxjs";
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginacaoParams } from "src/app/_shared/models/paginacao-params.model";
import { Escola } from "src/app/_shared/models/escola.model";
import { ListaPaginadaApiResponse } from "src/app/_shared/models/lista-paginada-api-response.model";
import { BuscaAvancadaParams } from "./models/busca-avancada-params.model";
import { BuscadorService } from "./services/buscador.service";

@Component({
    selector: 'app-buscador',
    templateUrl: 'buscador.component.html'
})
export class BuscadorComponent {

  pesquisarParam: string;
  dadosPaginacao: PaginacaoParams;
  queryParams: string;
  listaPaginadaApiResponse$: Observable<ListaPaginadaApiResponse<Escola>> = new Observable<ListaPaginadaApiResponse<Escola>>();
  escolas: Escola[] = [];

  exibeBuscaAvancada = false;
  filtrosSelecionados?: BuscaAvancadaParams;

  constructor(
    private buscadorService: BuscadorService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastrService: ToastrService
  ) {
    this.pesquisarParam = '';

    this.dadosPaginacao = {
      numero_pagina: 1,
      quantidade_registros: 10,
      total_paginas: 0,
      total_registros: 0,
    };

    this.queryParams = `?numero_pagina=${this.dadosPaginacao.numero_pagina}&quantidade_registros=${this.dadosPaginacao.quantidade_registros}&ordenacao=nome`;
  }

  consultarEscolas(): void {
    this.listaPaginadaApiResponse$ = this.buscadorService.consultarEscolas(this.queryParams)
      .pipe(
        map((response: ListaPaginadaApiResponse<Escola>) => {
          this.dadosPaginacao = {
            numero_pagina: response.numero_pagina,
            quantidade_registros: response.quantidade_registros,
            total_paginas: response.total_paginas,
            total_registros: response.total_registros,
          };
          console.log(this.dadosPaginacao);
          this.escolas = [...response.items];
          this.spinner.hide();

          return response;
        }),
        catchError((error) => {
          this.spinner.hide();
          this.toastrService.error(error.error.detail, 'Erro');

          return EMPTY;
        })
      );
  }

  handlePesquisar(pesquisarParam: string): void {
    if (!pesquisarParam)
      return;

    this.pesquisarParam = pesquisarParam;
    this.handleFiltrarDados(undefined);
  }

  handleBuscaAvancada(): void {
    this.toggleModal();
  }

  toggleModal(): void {
    this.exibeBuscaAvancada = !this.exibeBuscaAvancada;
  }

  handleFiltrarDados(filtros?: BuscaAvancadaParams): void {
    this.queryParams = `?numero_pagina=${this.dadosPaginacao.numero_pagina}&quantidade_registros=${this.dadosPaginacao.quantidade_registros}&ordenacao=nome`;

    if (filtros && filtros.estado_id)
      this.queryParams += `&estado_id=${filtros.estado_id}`;

    if (filtros && filtros.cidade_id)
      this.queryParams += `&cidade_id=${filtros.cidade_id}`;

    if (filtros && filtros.bairro_id)
      this.queryParams += `&bairro_id=${filtros.bairro_id}`;

    if (filtros && filtros.cep)
      this.queryParams += `&cep=${filtros.cep}`;

    if (filtros && filtros.endereco)
      this.queryParams += `&endereco=${filtros.endereco}`;

    if(this.pesquisarParam)
      this.queryParams += `&nome=${this.pesquisarParam}`;

    if(filtros) {
      this.toggleModal();
      this.filtrosSelecionados = filtros;
    }

    this.consultarEscolas();
  }

  handlePaginacao(dadosPaginacao: PaginacaoParams): void {
    console.log(dadosPaginacao);
    this.dadosPaginacao = dadosPaginacao;
    this.handleFiltrarDados(this.filtrosSelecionados);
  }
}
