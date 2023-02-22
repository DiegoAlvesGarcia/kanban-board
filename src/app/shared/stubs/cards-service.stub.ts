import { of } from "rxjs";
import { CardMock } from "../mocks/card.mock";

export const CardsServiceStub = {
    getCards: jest.fn(() => of(CardMock)),
    postCard: jest.fn(() => of({})),
    putCard: jest.fn(() => of({})),
    deleteCard: jest.fn(() => of({})),
}