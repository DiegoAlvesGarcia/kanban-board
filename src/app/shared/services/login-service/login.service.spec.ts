import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CardMock } from '../../mocks/card.mock';
import { httpClientStub } from '../../stubs/http-cliente.stub';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: httpClientStub },
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be test login function', () => {
    service.login().subscribe();
    expect(httpClientStub.post).toHaveBeenCalled()
  })

  it('should be test token value', () => {
    service.token = CardMock[0].id
    const getToken = service.token
    expect(getToken).toEqual(CardMock[0].id)
  })
});
