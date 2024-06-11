import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginacaoComponent } from './paginacao.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroArrowLeft, heroArrowRight } from '@ng-icons/heroicons/outline';

@NgModule({
    declarations: [
      PaginacaoComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgIconsModule.withIcons({
          heroArrowLeft, heroArrowRight
        }),
    ],
    exports: [PaginacaoComponent]
})
export class PaginacaoModule {}
