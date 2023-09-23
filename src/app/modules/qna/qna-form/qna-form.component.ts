import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LAWAREA_DATA } from 'src/app/core/constants/lawarea-data';
import { Answer, QnaModel } from 'src/app/core/models/qna.model';
import { Topic } from 'src/app/core/models/search.model';
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
  categoryList: Topic[] = [];
  lawAreaData = LAWAREA_DATA.sort((a, b) => a.name.localeCompare(b.name));
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
      category: [null, Validators.required],
    });
    this.categoryList = this.setCategory();
  }
  postQuestion() {
    const qnaData: QnaModel = {
      question: this.myForm.value.question,
      explanation: this.myForm.value.explanation,
      location: this.myForm.value.cityAndTown,
      date: new Date().toString(),
      answers: [] as Answer[],
      id: new Date().getTime(),
      category:
        this.categoryList.find(
          (cat) => cat.id === Number(this.myForm.value.category)
        ) ?? this.categoryList[0],
    };
    this.qnaService.setQnaData(qnaData);
    this.bsModalRef.hide();
  }

  setCategory() {
    return this.lawAreaData.reduce((prev, curr) => {
      const category: Topic = {
        id: curr.id,
        name: curr.name,
      };
      prev.push(category);
      return prev;
    }, [] as Topic[]);
  }
}
