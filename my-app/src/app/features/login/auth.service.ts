import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private url = environment.url;

  // signup
  signUp(item: any): Observable<any> {
    return this.http.post(`${this.url}/register`, item);
  }

  // signin
  public signIn(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(`${environment.url}/login`, credentials);
  }
}
