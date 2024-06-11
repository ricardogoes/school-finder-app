import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HeaderModule } from './_layout/header/header.module';
import { PublicRoutingModule } from './public-routing.module';

import { PublicComponent } from './public.component';


@NgModule({
    declarations: [
        PublicComponent
    ],
    imports: [
        CommonModule,
        FormsModule, ReactiveFormsModule,
        NgxSpinnerModule,
        PublicRoutingModule,
        HeaderModule
    ]
})
export class PublicModule {}
