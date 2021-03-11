import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Constants } from '../constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService, private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith(Constants.apiRoot)){
      return from(this._authService.getAccessToken().then(accessToken => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        const authReq = req.clone({headers});
        return next.handle(authReq).pipe(tap(_ => {}, error => {
          var responseError = error as HttpErrorResponse;
          if(responseError && (responseError.status === 401 || responseError.status === 403)) {
            this._router.navigate(['/unauthorized']);
          }
        })).toPromise();
      }));
    } else {
      return next.handle(req);
    }
  }
}
