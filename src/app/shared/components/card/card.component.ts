import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICard } from '../../interfaces/card.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() listBoard: ICard;
  @Output() editCard = new EventEmitter<ICard>();
  @Output() deleteCard = new EventEmitter<ICard>();
  @Output() nextStep = new EventEmitter<ICard>();
  @Output() previousStep = new EventEmitter<ICard>();

  edit(card: ICard) {
    this.editCard.emit(card)
  }

  delete(card: ICard) {
    this.deleteCard.emit(card)
  }

  next(card: ICard) {
    this.nextStep.emit(card)
  }

  previous(card: ICard) {
    this.previousStep.emit(card)
  }
}
