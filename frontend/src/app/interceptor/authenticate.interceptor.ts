import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable()
export class AuthenticateInterceptor implements HttpInterceptor {
  constructor(private token: TokenService, 
              private auth: AuthService, 
              private router:Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentToken = this.token.get();
    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token.get()}`
        }
      });
    }

    return next.handle(request).pipe(catchError(err => {
        if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.token.remove();
            this.auth.changeAuthStatus(false);
            this.router.navigateByUrl('/login');
            location.reload(true);
        }

        //const error = err.error.message || err.statusText;
        return throwError(err);
    }));
    
  }
}