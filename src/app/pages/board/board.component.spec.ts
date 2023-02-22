import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { steps } from 'src/app/shared/enums/steps.enum';
import { CardMock } from 'src/app/shared/mocks/card.mock';
import { CardsService } from 'src/app/shared/services/cards-service/cards.service';
import { LoginService } from 'src/app/shared/services/login-service/login.service';
import { CardsServiceStub } from 'src/app/shared/stubs/cards-service.stub';
import { LoginServiceStub } from 'src/app/shared/stubs/login-service.stub';
import { MatDialogRefStub } from 'src/app/shared/stubs/mat-dialog-ref.stub';
import { MatDialogStub } from 'src/app/shared/stubs/mat-dialog.stub';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      providers: [
        { provide: MatDialog, useValue: MatDialogStub },
        { provide: LoginService, useValue: LoginServiceStub },
        { provide: CardsService, useValue: CardsServiceStub },
      ],
      imports: [DragDropModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test editCard function', () => {
    component.editCard(CardMock[0])
    expect(CardsServiceStub.putCard).toBeCalled()
  })

  it('should to test newCard function', () => {
    const cardWithoutId = CardMock[0];
    cardWithoutId.id = '';
    MatDialogRefStub.afterClosed.mockReturnValue(of(cardWithoutId))
    component.newCard()
    expect(CardsServiceStub.postCard).toBeCalled()
  })

  it('should to test deleteCard function', () => {
    component.deleteCard(CardMock[0])
    expect(CardsServiceStub.deleteCard).toBeCalled()
  })

  it('should to test nextCard function with To Do', () => {
    component.nextCard(CardMock[0])
    expect(CardsServiceStub.putCard).toBeCalled()
  })
  it('should to test nextCard function with Doing', () => {
    component.nextCard(CardMock[1])
    expect(CardsServiceStub.putCard).toBeCalled()
  })

  it('should to test previousCard function with Doing', () => {
    let card = {
      conteudo: 'conteudo',
      titulo: 'titulo',
      lista: steps.SECOND_STEP,
      id: '869b87c9-4d59-446b-9690-8f5246107119'
    };
    component.previousCard(card)
    expect(CardsServiceStub.putCard).toBeCalled()
  })

  it('should to test previousCard function with Done', () => {
    component.previousCard(CardMock[2])
    expect(CardsServiceStub.putCard).toBeCalled()
  })

  it('should to test drop function', () => {
    const myEvent = {
      previousContainer: {
        data: []
      },
      container: {
        data: [CardMock[0] as unknown]
      },
      previousIndex: 1,
      currentIndex: 0,

    } as CdkDragDrop<string[]>;
    component.drop(myEvent)
    expect(CardsServiceStub.putCard).toBeCalled()
  })
});
