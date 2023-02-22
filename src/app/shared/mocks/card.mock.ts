import { steps } from "../enums/steps.enum";
import { ICard } from "../interfaces/card.interface";

export const CardMock: Array<ICard> = [
    {
        conteudo: 'conteudo',
        titulo: 'titulo',
        lista: steps.FISRT_STEP,
        id: '869b87c9-4d59-446b-9690-8f5246107119'
    },
    {
        conteudo: 'conteudo',
        titulo: 'titulo',
        lista: steps.SECOND_STEP,
        id: '869b87c9-4d59-446b-9690-8f5246107119'
    },
    {
        conteudo: 'conteudo',
        titulo: 'titulo',
        lista: steps.THIRD_STEP,
        id: '869b87c9-4d59-446b-9690-8f5246107119'
    },
]