import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpXsrfTokenExtractor,
  HttpResponse,
  HttpErrorResponse,
  HttpClient,
  HttpResponseBase,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private http: HttpClient,
    private tokenExtractor: HttpXsrfTokenExtractor,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenExtractor.getToken() as string;

    if (this.tokenExtractor.getToken()) {
      if (!request.url.startsWith('https://storage.googleapis.com/')) {
        request = request.clone({
          headers: new HttpHeaders({
            'X-Requested-With': 'XMLHttpRequest',
            'x-CSRFToken': token,
          }),
        });
      }
    }

    return next.handle(request).pipe(
      map((response: any) => response),
      catchError((error: HttpResponse<HttpErrorResponse>) => {
        if (error.status === 403) {
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
