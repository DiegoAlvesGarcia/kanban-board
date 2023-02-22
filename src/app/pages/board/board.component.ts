import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DialogTaskComponent } from 'src/app/shared/components/dialog-task/dialog-task.component';
import { steps } from 'src/app/shared/enums/steps.enum';
import { ICard } from 'src/app/shared/interfaces/card.interface';
import { CardsServiceService } from 'src/app/shared/services/cards-service/cards-service.service';
import { LoginServiceService } from 'src/app/shared/services/login-service/login-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards = [];

  constructor(
    private dialog: MatDialog,
    private loginServiceService: LoginServiceService,
    private cardsServiceService: CardsServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.login();
  }

  private login() {
    this.loginServiceService.login()
      .pipe(first())
      .subscribe(() => {
        this.getCards();
      });
  }

  private getCards() {
    this.cardsServiceService.getCards()
      .pipe(first())
      .subscribe(respCards => {
        this.createBoards();
        this.listBoard(respCards);
      })
  }

  private createBoards() {
    this.boards = [
      {
        title: steps.FISRT_STEP,
        listBoard: []
      },
      {
        title: steps.SECOND_STEP,
        listBoard: []
      },
      {
        title: steps.THIRD_STEP,
        listBoard: []
      }
    ]
  }

  private listBoard(cards: Array<ICard>) {
    cards.forEach((card) => {
      let index: number;
      switch (card.lista) {
        case this.boards[0].title:
          index = 0;
          break;
        case this.boards[1].title:
          index = 1
          break;
        case this.boards[2].title:
          index = 2
          break;
        default:
          break;
      }
      this.boards[index].listBoard.push(card);
      this.changeDetectorRef.detectChanges();
    })
  }

  private openDialog(card?: ICard) {
    const dialogRef = this.dialog.open(DialogTaskComponent, {
      data: {
        card,
        principalButton: card ? 'Editar' : 'Criar'
      }
    });

    dialogRef.afterClosed().subscribe((dataCard: ICard) => {
      if (dataCard) {
        if (dataCard?.id) {
          this.putCard(dataCard)
        } else {
          this.postCard(dataCard)
        };
      }
    });
  }

  private postCard(dataCard: ICard) {
    this.cardsServiceService.postCard(dataCard)
      .subscribe(() => {
        this.getCards();
      });
  }

  private putCard(dataCard: ICard) {
    this.cardsServiceService.putCard(dataCard)
      .subscribe(() => {
        this.getCards();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const data = event.container.data[event.currentIndex] as unknown as ICard
      data.lista = event.container.connectedTo as string;
      this.putCard(data)
    }
  }

  deleteCard(card: ICard) {
    this.cardsServiceService.deleteCard(card)
      .subscribe(() => {
        this.getCards();
      });
  }

  previousCard(card: ICard) {
    let index: number;
    switch (card.lista) {
      case this.boards[1].title:
        index = 1
        break;
      case this.boards[2].title:
        index = 2
        break;
      default:
        break;
    }
    card.lista = this.boards[index - 1].title
    this.putCard(card)
  }

  nextCard(card: ICard) {
    let index: number;
    switch (card.lista) {
      case this.boards[0].title:
        index = 0
        break;
      case this.boards[1].title:
        index = 1
        break;
      default:
        break;
    }

    card.lista = this.boards[index + 1].title
    this.putCard(card)
  }

  editCard(card: ICard) {
    this.openDialog(card)
  }

  newCard() {
    this.openDialog()
  }
}
