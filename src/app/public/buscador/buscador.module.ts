import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginacaoModule } from 'src/app/_shared/components/paginacao/paginacao.module';

import { BuscadorRoutingModule } from './buscador-routing.module';
import { BuscadorComponent } from './buscador.component';
import { BuscaSimplesComponent } from './components/busca-simples/busca-simples.component';
import { BuscaAvancadaComponent } from './components/busca-avancada/busca-avancada.component';
import { ResultadoPesquisaComponent } from './components/resultados-pesquisa/resultados-pesquisa.component';


@NgModule({
  declarations: [
    BuscadorComponent,
    BuscaSimplesComponent,
    BuscaAvancadaComponent,
    ResultadoPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BuscadorRoutingModule,
    PaginacaoModule
  ]
})
export class BuscadorModule {}
