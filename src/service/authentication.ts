import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, filter, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  [x: string]: any;

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  public login(data: any): Observable<any> {
    return this.http.post('/api/accounts/login/', data);
  }

  me = (): Observable<any> => {
    return this.http.get<any>('/api/accounts/me/', {
      headers: this.httpOptions,
    });
  };

  public logout(data: any): Observable<any> {
    return this.http.get('/api/accounts/logout/');
  }

  public header(): Observable<any> {
    return this.http.get('/api/my_network/headers/');
  }

  public chal(): Observable<any> {
    return this.http.get('/api/core/list/channels/');
  }

  public getstatus(): Observable<any> {
    return this.http.get('/api/my_network/status/');
  }

  public getchannel(): Observable<any> {
    return this.http.get('/api/core/list/networks/');
  }

  getchannelList = (
    page: string | number | boolean,
    size: string | number | boolean,
    id: string | number | boolean,
    selectedStatus: any
  ): Observable<any> => {
    const options = {
      params: new HttpParams()
        .set('page', page)
        .set('page_size', size)
        .set('channel_filter', id),
    };
    return this.http.get('/api/my_network/list/', options).pipe(
      map((response: any) => {
        return response;
      })
    );
  };

  getstatusList = (
    page: string | number | boolean,
    size: string | number | boolean,
    status: string | number | boolean
  ): Observable<any> => {
    const options = {
      params: new HttpParams()
        .set('page', page)
        .set('page_size', size)
        .set('status', status),
    };
    return this.http.get('/api/my_network/list/', options).pipe(
      map((response: any) => {
        return response;
      })
    );
  };
}
