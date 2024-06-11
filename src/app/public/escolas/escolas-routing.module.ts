import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EscolasComponent } from './escolas.component';

const routes: Routes = [
    {
      path: '',
      children: [
        {
            path: ':id',
            component: EscolasComponent
        }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EscolasRoutingModule { }
