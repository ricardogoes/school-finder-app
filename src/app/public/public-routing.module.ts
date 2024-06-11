import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      {
        path: 'buscador',
        loadChildren: () =>
          import('./buscador/buscador.module').then((m) => m.BuscadorModule),
      },
      {
        path: 'escolas',
        loadChildren: () =>
          import('./escolas/escolas.module').then((m) => m.EscolasModule),
      },
      { path: '', redirectTo: 'buscador', pathMatch: 'prefix' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
