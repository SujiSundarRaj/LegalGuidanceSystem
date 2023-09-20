import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QnaFormComponent } from '../qna-form/qna-form.component';

@Component({
  selector: 'app-ask-question',
  template: '',
  styleUrls: ['./ask-question.component.scss'],
})
export class AskQuestionComponent implements OnInit, OnDestroy {
  dialogRef: any;
  constructor(private dialog: MatDialog) {
    console.log('On constructor');
  }

  ngOnInit(): void {
    console.log('On init');
    this.dialogRef = this.dialog.open(QnaFormComponent, {
      width: '400',
    });
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
  }
}
