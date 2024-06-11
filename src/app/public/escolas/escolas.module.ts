import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgIconsModule } from '@ng-icons/core';
import { heroCheck } from '@ng-icons/heroicons/outline';

import { EscolasComponent } from './escolas.component';
import { EscolasRoutingModule } from './escolas-routing.module';

@NgModule({
  declarations: [EscolasComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      heroCheck
    }),
    EscolasRoutingModule
  ],
})
export class EscolasModule {}
