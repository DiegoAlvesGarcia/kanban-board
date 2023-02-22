import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMock } from '../../mocks/card.mock';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test edit function', () => {
    jest.spyOn(component.editCard, 'emit');
    component.edit(CardMock)
    expect(component.editCard.emit).toHaveBeenCalledWith(CardMock)
  });
  it('should to test delete function', () => {
    jest.spyOn(component.deleteCard, 'emit');
    component.delete(CardMock)
    expect(component.deleteCard.emit).toHaveBeenCalledWith(CardMock)
  });
  it('should to test next function', () => {
    jest.spyOn(component.nextStep, 'emit');
    component.next(CardMock)
    expect(component.nextStep.emit).toHaveBeenCalledWith(CardMock)
  });
  it('should to test previous function', () => {
    jest.spyOn(component.previousStep, 'emit');
    component.previous(CardMock)
    expect(component.previousStep.emit).toHaveBeenCalledWith(CardMock)
  });
});
