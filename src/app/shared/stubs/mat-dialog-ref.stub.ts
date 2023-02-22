import { of } from "rxjs";
import { CardMock } from "../mocks/card.mock";

export const MatDialogRefStub = {
    close: jest.fn(() => {}),
    afterClosed: jest.fn(() => of(CardMock[0]))
}