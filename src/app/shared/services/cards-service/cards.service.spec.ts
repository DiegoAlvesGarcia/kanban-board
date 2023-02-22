import { HttpClient } from '@angular/common/http';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { steps } from '../../enums/steps.enum';
import { CardMock } from '../../mocks/card.mock';
import { httpClientStub } from '../../stubs/http-cliente.stub';

import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
      ]
    });
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be teste getCards function', fakeAsync(() => {
    service.getCards().subscribe((resp) => {
      expect(resp).toEqual({})
    })
  }))

  it('should be teste postCard function', fakeAsync(() => {
    service.postCard(CardMock).subscribe(() => {
      service.getCards().subscribe((resp) => {
        expect(resp).toEqual(CardMock)
      })
    })
  }))

  it('should be teste putCard function', fakeAsync(() => {
    service.postCard(CardMock).subscribe(() => {
      const cardEdited = CardMock;
      cardEdited.titulo = steps.SECOND_STEP
      service.putCard(cardEdited).subscribe(() => {
        service.getCards().subscribe((resp) => {
          expect(resp).toEqual(cardEdited)
        })
      })
    })
  }))
  it('should be teste deleteCard function', fakeAsync(() => {
    service.postCard(CardMock).subscribe(() => {
      service.deleteCard(CardMock).subscribe(() => {
        service.getCards().subscribe((resp) => {
          expect(resp).toEqual({})
        })
      })
    })
  }))
});
