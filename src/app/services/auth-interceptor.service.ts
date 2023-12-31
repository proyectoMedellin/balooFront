import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MD5 } from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private cookies: CookieService,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenname = MD5("token").toString();
    let token = this.cookies.get(tokenname);

    let request = req;
    
     if (token != null) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err) => {

        if (err.status === 401) {
          this.router.navigateByUrl('/login');
        }
        throw new Error(err)
      })
    );
  
    }
  
}
