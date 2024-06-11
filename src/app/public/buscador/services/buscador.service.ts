import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ListaPaginadaApiResponse } from 'src/app/_shared/models/lista-paginada-api-response.model';
import { Escola } from 'src/app/_shared/models/escola.model';
import { EscolaDetalhada } from 'src/app/_shared/models/escola-detalhada.model';
import { Estado } from 'src/app/_shared/models/estado.model';
import { Cidade } from 'src/app/_shared/models/cidade.model';
import { Bairro } from 'src/app/_shared/models/bairro.model';

@Injectable({
  providedIn: 'root',
})
export class BuscadorService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') public apiUrl: string,
  ) {
  }

  consultarEscolas(queryParams: string): Observable<ListaPaginadaApiResponse<Escola>> {
    const url = `${this.apiUrl}/v1/buscador/escolas${queryParams}`;
    console.log(url);
    return this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));
  }

  consultarEscolaPeloId(id: number): Observable<EscolaDetalhada> {
    const url = `${this.apiUrl}/v1/buscador/escolas/${id}`;
    return this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));
  }

  consultarEstados(): Observable<Estado[]> {
    const url = `${this.apiUrl}/v1/buscador/estados`;
    return this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));
  }

  consultarCidadesDoEstado(estadoId: number): Observable<Cidade[]> {
    const url = `${this.apiUrl}/v1/buscador/estados/${estadoId}/cidades`;
    return this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));
  }

  consultarBairrosDaCidade(cidadeId: number): Observable<Bairro[]> {
    const url = `${this.apiUrl}/v1/buscador/cidades/${cidadeId}/bairros`;
    return this.http.get<any>(url).pipe(map((response: any) => JSON.parse(JSON.stringify(response))));
  }
}
