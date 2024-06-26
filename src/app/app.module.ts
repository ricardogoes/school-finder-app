import { NgModule } from '@angular/core';
import {
  BrowserModule,
  Title,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpTokenInterceptor } from './_shared/interceptors/http.interceptor';
import { provideEnvironmentNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
    provideClientHydration(),
    provideEnvironmentNgxMask(),
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    { provide: 'API_URL', useValue: environment.apiUrl }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
