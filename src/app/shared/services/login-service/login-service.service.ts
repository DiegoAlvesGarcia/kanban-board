import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginEnum } from '../../enums/login.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(
    private http: HttpClient
  ) { }

  loginToken: string;

  public get token(): string {
    return this.loginToken;
  }

  public set token(value: string) {
    this.loginToken = value;
  }

  login() {
    const body = { "login": LoginEnum.DEFAULT_LOGIN, "senha": LoginEnum.DEFAULT_PASSWORD };
    return this.http.post<any>('http://localhost:5000/login/', body)
      .pipe(
        tap((token) => {
          this.token = token;
        })
      )
  }
}
