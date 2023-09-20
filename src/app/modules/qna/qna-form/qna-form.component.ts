import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Answer, QnaModel } from 'src/app/core/models/qna.model';
import { QnaService } from 'src/app/core/services/qna.service';

@Component({
  selector: 'app-qna-form',
  templateUrl: './qna-form.component.html',
  styleUrls: ['./qna-form.component.scss'],
})
export class QnaFormComponent {
  myForm: FormGroup;
  //triggerClose = new Subject();
  title?: string;
  closeBtnName?: string;
  constructor(
    private readonly fb: FormBuilder,
    private readonly qnaService: QnaService,
    public bsModalRef: BsModalRef
  ) {
    this.myForm = this.fb.group({
      question: [null, Validators.required],
      explanation: [null, Validators.required],
      cityAndTown: [null, Validators.required],
      requiredSolicitor: [null, Validators.required],
    });
  }
  postQuestion() {
    const qnaData: QnaModel = {
      question: this.myForm.value.question,
      explanation: this.myForm.value.explanation,
      location: this.myForm.value.cityAndTown,
      date: new Date().toString(),
      answers: [] as Answer[],
      id: new Date().getTime(),
    };
    this.qnaService.setQnaData(qnaData);
    this.bsModalRef.hide();
  }
}
