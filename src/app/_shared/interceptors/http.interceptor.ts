import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('http') != -1)
      this.spinner.show();

    return next.handle(request).pipe(
      tap((evt: any) => {
        if (evt instanceof HttpResponse) {
          this.spinner.hide();
        }

        return evt;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        return throwError(() => error);
      })
    );
  }
}
