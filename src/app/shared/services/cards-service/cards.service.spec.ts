import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
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

  it('should be test getCards function', () => {
    service.getCards();
    expect(httpClientStub.get).toHaveBeenCalled()
  })

  it('should be test postCard function', () => {
    service.postCard(CardMock);
    expect(httpClientStub.post).toHaveBeenCalled()
  })

  it('should be test putCard function', () => {
    service.putCard(CardMock);
    expect(httpClientStub.put).toHaveBeenCalled()
  })

  it('should be test deleteCard function', () => {
    service.deleteCard(CardMock);
    expect(httpClientStub.delete).toHaveBeenCalled()
  })
});
