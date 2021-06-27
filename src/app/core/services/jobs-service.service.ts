import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Constants } from '../constants/contants';

@Injectable({
  providedIn: 'root'
})
export class JobsServiceService {

  constructor(private http: HttpClient) {
  }

  public getJobs(page:any): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}${Constants.JOBS_PATH}?page=${page}`);
  }
}
