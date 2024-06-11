import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginacaoParams } from '../../models/paginacao-params.model';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {

  @Input() dadosPaginacao!: PaginacaoParams;
  @Output() alterouPaginacao = new EventEmitter<PaginacaoParams>();

  paginaInicial = 1;
  paginaFinal = 5;

  // Pagination functions
  alterouQuantidadeRegistros(selectedValue: number): void {
    this.dadosPaginacao.quantidade_registros = +selectedValue;
    this.alterouPaginacao.emit(this.dadosPaginacao);
  }

  alterouNumeroPagina(numeroPagina: number): void {
    console.log(numeroPagina);
    this.dadosPaginacao.numero_pagina = +numeroPagina;
    this.alterouPaginacao.emit(this.dadosPaginacao);
  }

  proximaPagina(): void {
    this.dadosPaginacao.numero_pagina += 1;
    this.alterouPaginacao.emit(this.dadosPaginacao);
  }

  paginaAnterior(): void {
    this.dadosPaginacao.numero_pagina -= 1;
    this.alterouPaginacao.emit(this.dadosPaginacao);
  }

  verMaisPaginas(): void {
    this.paginaInicial += 5;
    this.paginaFinal += 5;
  }


  paginasExibidas(): number[] {
    const pages: number[] = [];
    for (let i = this.paginaInicial; i <= this.paginaFinal; i++) {
      pages.push(i);
    }
    return pages;
  }

  get temMaisDeUmaPagina(): boolean {
    return this.dadosPaginacao.total_paginas > 1;
  }

  get ultimaPagina(): number{
    return this.dadosPaginacao.total_paginas;
  }
}
