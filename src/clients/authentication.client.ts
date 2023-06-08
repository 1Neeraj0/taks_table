import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(_username: string, _password: string) {
    return this.http.post(environment.apiUrl + '/api/accounts/login/', {
      username: 'elkay1@crowdanalytix.com',
      password: 'Elk1@2621',
    });
  }
}
