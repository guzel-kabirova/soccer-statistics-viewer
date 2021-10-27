import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers.append('X-Auth-Token', environment.apiKey)
    });
    return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if(err.status === 429) {
          console.log(err);
        }
        return throwError(err)
      }))
  }

}
