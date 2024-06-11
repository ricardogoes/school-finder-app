import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BuscaAvancadaParams } from '../../models/busca-avancada-params.model';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { Estado } from 'src/app/_shared/models/estado.model';
import { BuscadorService } from '../../services/buscador.service';
import { ToastrService } from 'ngx-toastr';
import { Cidade } from 'src/app/_shared/models/cidade.model';
import { Bairro } from 'src/app/_shared/models/bairro.model';

@Component({
  selector: 'app-busca-avancada',
  templateUrl: 'busca-avancada.component.html',
})
export class BuscaAvancadaComponent implements OnInit {

  @Output() filtrarDados = new EventEmitter<BuscaAvancadaParams>();
  @Output() fecharModal = new EventEmitter();

  buscaAvancadaForm: FormGroup;

  estados$: Observable<Estado[]> = new Observable<Estado[]>();
  estados: Estado[] = [];

  cidades: Cidade[] = [];
  bairros: Bairro[] = [];

  constructor(
    private fb: FormBuilder,
    private buscadorService: BuscadorService,
    private toastrService: ToastrService
  ) {
    this.buscaAvancadaForm = this.fb.group({
      estado_id: [''],
      cidade_id: [''],
      bairro_id: [''],
      cep: [''],
      endereco: ['']
    });
  }

  ngOnInit(): void {
    this.consultarEstados();
  }

  consultarEstados(): void {
    this.estados$ = this.buscadorService.consultarEstados()
    .pipe(
      map((response: Estado[]) => {
        this.estados = [...response];
        return response;
      }),
      catchError((error) => {
        this.toastrService.error(error.error.detail, 'Erro');
        return EMPTY;
      })
    );
  }

  handleAlterouEstado(estadoId: number): void {
    this.buscadorService.consultarCidadesDoEstado(estadoId)
    .subscribe({
      next: (cidades: Cidade[]) => {
        this.cidades = cidades;
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }

  handleAlterouCidade(cidadeId: number): void {
    this.buscadorService.consultarBairrosDaCidade(cidadeId)
    .subscribe({
      next: (bairros: Bairro[]) => {
        this.bairros = bairros;
      },
      error: (error) => {
        this.toastrService.error(error.error.detail, 'Erro');
      }
    });
  }

  handleFiltrarDados(): void {
    const filtros: BuscaAvancadaParams = {estado_id: undefined, cidade_id: undefined, bairro_id: undefined};

    if (this.buscaAvancadaForm.controls['estado_id'].value && this.buscaAvancadaForm.controls['estado_id'].value !== '')
      filtros.estado_id = this.buscaAvancadaForm.controls['estado_id'].value;

    if (this.buscaAvancadaForm.controls['cidade_id'].value && this.buscaAvancadaForm.controls['cidade_id'].value !== '')
    filtros.cidade_id = this.buscaAvancadaForm.controls['cidade_id'].value;

    if (this.buscaAvancadaForm.controls['bairro_id'].value && this.buscaAvancadaForm.controls['bairro_id'].value !== '')
      filtros.bairro_id = this.buscaAvancadaForm.controls['bairro_id'].value;

    if (this.buscaAvancadaForm.controls['cep'].value && this.buscaAvancadaForm.controls['cep'].value !== '')
      filtros.cep = this.buscaAvancadaForm.controls['cep'].value;

    if (this.buscaAvancadaForm.controls['endereco'].value && this.buscaAvancadaForm.controls['endereco'].value !== '')
      filtros.endereco = this.buscaAvancadaForm.controls['endereco'].value;

    this.filtrarDados.emit(filtros);
  }

  handleFecharModal(): void {
    this.fecharModal.emit();
  }

  handleResetarFiltros(): void {
    this.buscaAvancadaForm.reset();
  }
}
