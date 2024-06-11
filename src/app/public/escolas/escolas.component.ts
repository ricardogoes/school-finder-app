import { Component, OnInit } from "@angular/core";
import { BuscadorService } from "../buscador/services/buscador.service";
import { EscolaDetalhada } from "src/app/_shared/models/escola-detalhada.model";
import { Observable, map } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-escolas',
    templateUrl: 'escolas.component.html'
})
export class EscolasComponent implements OnInit  {

  escola$ = new Observable<EscolaDetalhada>();
  escola: EscolaDetalhada|undefined;

  constructor(
    private buscadorService: BuscadorService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const escolaId = this.route.snapshot.paramMap.get('id') ?? "";
    this.consultarEscolaPeloId(escolaId);
  }

  consultarEscolaPeloId(escolaId: string): void {
    this.escola$ = this.buscadorService.consultarEscolaPeloId(+escolaId)
      .pipe(
        map((escola: EscolaDetalhada) => {
          this.escola = escola;
          return escola;
        })
      );
  }
}
