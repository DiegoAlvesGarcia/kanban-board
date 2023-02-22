import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { steps } from '../../enums/steps.enum';
import { ICard } from '../../interfaces/card.interface';
import { LoginServiceService } from '../login-service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class CardsServiceService {

  constructor(
    private http: HttpClient,
    private loginServiceService: LoginServiceService
  ) { }

  getCards() {
    const headers = {
      'Authorization': `Bearer ${this.loginServiceService.token}`
    };
    return this.http.get<Array<ICard>>('http://localhost:5000/cards/', { headers });
  }

  postCard(dataCard: ICard) {
    const body = { titulo: dataCard.titulo, conteudo: dataCard.conteudo, lista: steps.FISRT_STEP };
    const headers = {
      'Authorization': `Bearer ${this.loginServiceService.token}`
    };
    return this.http.post<ICard>('http://localhost:5000/cards/', body, { headers })
  }

  putCard(dataCard: ICard) {
    const body = {
      id: dataCard.id,
      titulo: dataCard.titulo,
      conteudo: dataCard.conteudo,
      lista: dataCard.lista
    };
    const headers = {
      'Authorization': `Bearer ${this.loginServiceService.token}`
    };
    return this.http.put<ICard>(`http://localhost:5000/cards/${dataCard.id}`, body, { headers })
  }

  deleteCard(dataCard: ICard) {
    const headers = {
      'Authorization': `Bearer ${this.loginServiceService.token}`
    };
    return this.http.delete<ICard>(`http://localhost:5000/cards/${dataCard.id}`, { headers })
  }
}
