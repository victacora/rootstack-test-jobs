import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenInf = this.authService.loadToken();
    if (tokenInf && tokenInf.access_token) {
      request = request.clone({
        setHeaders: { "Authorization": `Bearer ${tokenInf.access_token}` },
      });
    }
    return next.handle(request);
  }
}
