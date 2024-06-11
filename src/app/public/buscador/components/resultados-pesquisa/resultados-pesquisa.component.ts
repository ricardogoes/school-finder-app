import { Component, EventEmitter, Input, Output, TrackByFunction } from "@angular/core";
import { Router } from '@angular/router';

import { EnderecoEscola } from "src/app/_shared/models/endereco-escola.model";
import { Escola } from "src/app/_shared/models/escola.model";
import { PaginacaoParams } from "src/app/_shared/models/paginacao-params.model";

@Component({
    selector: 'app-resultados-pesquisa',
    templateUrl: 'resultados-pesquisa.component.html'
})
export class ResultadoPesquisaComponent {

  @Input() escolasFiltradas: Escola[] = []
  @Input() dadosPaginacao: PaginacaoParams;

  @Output() alterouPaginacao = new EventEmitter<PaginacaoParams>();

  constructor(
    private router: Router
  ) {
    this.dadosPaginacao = {
      numero_pagina: 1,
      quantidade_registros: 10,
      total_paginas: 0,
      total_registros: 0,
    };
  }

  handleAbrirDetalhes(escola: Escola): void {
    this.router.navigate(['/escolas', escola.id]);
  }

  obterEnderecoEscola(endereco: EnderecoEscola): string {
    return `${endereco.endereco}, ${endereco.endereco_numero} ${endereco.complemento} - ${endereco.bairro} - ${endereco.cidade}/${endereco.estado} - ${endereco.cep}`;
  }

  handlePaginacao(dadosPaginacao: PaginacaoParams): void {
    this.alterouPaginacao.emit(dadosPaginacao);
  }

  trackByEscolaId: TrackByFunction<Escola> = (index, escola) => escola.id
}
