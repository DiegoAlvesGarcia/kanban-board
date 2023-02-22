import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { steps } from '../../enums/steps.enum';
import { CardMock } from '../../mocks/card.mock';
import { httpClientStub } from '../../stubs/http-cliente.stub';

import { CardsServiceService } from './cards-service.service';

describe('CardsServiceService', () => {
  let service: CardsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
      ]
    });
    service = TestBed.inject(CardsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be teste getCards function', () => {
    service.getCards().subscribe((resp) => {
      expect(resp).toEqual({})
    })
  })
  it('should be teste postCard function', () => {
    service.postCard(CardMock).subscribe(() => {
      service.getCards().subscribe((resp) => {
        expect(resp).toEqual(CardMock)
      })
    })
  })
  it('should be teste putCard function', () => {
    service.postCard(CardMock).subscribe(() => {
      const cardEdited = CardMock;
      cardEdited.titulo = steps.SECOND_STEP
      service.putCard(cardEdited).subscribe(() => {
        service.getCards().subscribe((resp) => {
          expect(resp).toEqual(cardEdited)
        })
      })
    })
  })
  it('should be teste deleteCard function', () => {
    service.getCards().subscribe(resp => {
      expect(resp).toEqual({})
      service.postCard(CardMock).subscribe(() => {
        service.getCards().subscribe((resp) => {
          expect(resp).toEqual(CardMock)
          service.deleteCard(CardMock).subscribe(() => {
            service.getCards().subscribe((resp)=> {
              expect(resp).toEqual({})
            })
          })
        })
      })
    })
  })
});
