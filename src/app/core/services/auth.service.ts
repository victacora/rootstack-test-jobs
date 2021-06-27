import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants/contants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private user: any;

  constructor(private http: HttpClient) {
  }

  public login(data:any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}${Constants.LOGIN_PATH}`, data)
      .pipe(
        map((res) => {
          this.user = res;
          localStorage.setItem(Constants.USER_LOCAL_STORAGE_KEY, JSON.stringify(this.user));
          return this.user;
        }));
  }

  public logout() {
    localStorage.removeItem(Constants.USER_LOCAL_STORAGE_KEY);
    this.user = null;
  }

  public userData(): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${Constants.ABOUT_ME_PATH}`);
  }

  public loadToken(): any{
    let user: any =localStorage.getItem(Constants.USER_LOCAL_STORAGE_KEY);
    if (user) {
      this.user = JSON.parse(user);
    }
    return this.user;
  }
}
