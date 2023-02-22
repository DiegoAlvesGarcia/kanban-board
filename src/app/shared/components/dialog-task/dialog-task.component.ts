import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICard } from '../../interfaces/card.interface';
import { IDialogData } from '../../interfaces/dialog-data.interface';

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDialogData
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      titulo: new FormControl(this.data.card?.titulo, [Validators.required]),
      conteudo: new FormControl(this.data.card?.conteudo, [Validators.required])
    });
  }

  closeDialog(isPrincipal?: boolean): void {
    let objectClose: ICard;
    if (isPrincipal) {
      objectClose = {
        conteudo: this.form.controls['conteudo'].value,
        titulo: this.form.controls['titulo'].value,
        id: this.data.card?.id,
        lista: this.data.card?.lista,
      }
    } 
    this.dialogRef.close(objectClose);
  }
}
