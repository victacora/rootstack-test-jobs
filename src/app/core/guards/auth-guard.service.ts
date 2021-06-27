import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    let tokenInf = this.authService.loadToken();
    if (tokenInf && !tokenInf.access_token) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
