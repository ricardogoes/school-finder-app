import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-busca-simples',
    templateUrl: 'busca-simples.component.html'
})
export class BuscaSimplesComponent {

  @Output() pesquisar = new EventEmitter<string>();
  @Output() abrirBuscaAvancada = new EventEmitter();

  pesquisarParam: string;
  exibeBuscaAvancada = false;

  constructor(
  ) {
    this.pesquisarParam = '';
  }

  handlePesquisar(): void {
    if (!this.pesquisarParam)
      return;

    this.pesquisar.emit(this.pesquisarParam);
  }

  handleBuscaAvancada(): void {
    this.abrirBuscaAvancada.emit();
  }
}
