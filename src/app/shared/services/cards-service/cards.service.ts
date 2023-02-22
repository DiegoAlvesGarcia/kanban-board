import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { steps } from '../../enums/steps.enum';
import { ICard } from '../../interfaces/card.interface';
import { LoginService } from '../login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getCards() {
    const headers = {
      'Authorization': `Bearer ${this.loginService.token}`
    };
    return this.http.get<Array<ICard>>('http://localhost:5000/cards/', { headers })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            location.reload()
            throw 'token inválido. Recarregando tela para novo token';
          }
          throw 'API ERROR' + err.status;
        })
      );
  }

  postCard(dataCard: ICard) {
    const body = { titulo: dataCard.titulo, conteudo: dataCard.conteudo, lista: steps.FISRT_STEP };
    const headers = {
      'Authorization': `Bearer ${this.loginService.token}`
    };
    return this.http.post<ICard>('http://localhost:5000/cards/', body, { headers })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            location.reload()
            throw 'token inválido. Recarregando tela para novo token';
          }
          throw 'API ERROR' + err.status;
        })
      );
  }

  putCard(dataCard: ICard) {
    const body = {
      id: dataCard.id,
      titulo: dataCard.titulo,
      conteudo: dataCard.conteudo,
      lista: dataCard.lista
    };
    const headers = {
      'Authorization': `Bearer ${this.loginService.token}`
    };
    return this.http.put<ICard>(`http://localhost:5000/cards/${dataCard.id}`, body, { headers })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            location.reload()
            throw 'token inválido. Recarregando tela para novo token';
          }
          throw 'API ERROR' + err.status;
        })
      );
  }

  deleteCard(dataCard: ICard) {
    const headers = {
      'Authorization': `Bearer ${this.loginService.token}`
    };
    return this.http.delete<ICard>(`http://localhost:5000/cards/${dataCard.id}`, { headers })
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            location.reload()
            throw 'token inválido. Recarregando tela para novo token';
          }
          throw 'API ERROR' + err.status;
        })
      );
  }
}
