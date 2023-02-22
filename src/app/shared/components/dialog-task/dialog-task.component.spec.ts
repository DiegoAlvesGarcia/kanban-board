import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardMock } from '../../mocks/card.mock';
import { DialogDataMock } from '../../mocks/dialog-data.mock';
import { MatDialogRefStub } from '../../stubs/mat-dialog-ref.stub';

import { DialogTaskComponent } from './dialog-task.component';

describe('DialogTaskComponent', () => {
  let component: DialogTaskComponent;
  let fixture: ComponentFixture<DialogTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogTaskComponent],
      imports: [MatDialogModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: MatDialogRefStub
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should to test the object data', () => {
    component.data = DialogDataMock;
    component.ngOnInit();
    expect(component.form.controls['titulo'].value).toEqual('titulo')
    expect(component.form.controls['conteudo'].value).toEqual('conteudo')
  });

  it('should to test closeDialog function with data completed', () => {
    component.data = DialogDataMock;
    component.form.controls['conteudo'].setValue(component.data.card.conteudo)
    component.form.controls['titulo'].setValue(component.data.card.titulo)
    component.closeDialog(true)
    expect(MatDialogRefStub.close).toHaveBeenCalledWith(CardMock[0])
  })

  it('should to test closeDialog function with data incompleted', () => {
    component.form.controls['conteudo'].setValue(DialogDataMock.card.conteudo)
    component.form.controls['titulo'].setValue(DialogDataMock.card.titulo)
    DialogDataMock.card = undefined;
    component.closeDialog(true)
    expect(MatDialogRefStub.close).toHaveBeenCalledWith({
      conteudo: 'conteudo',
      titulo: 'titulo',
      lista: undefined,
      id: undefined
    })
  })
});
