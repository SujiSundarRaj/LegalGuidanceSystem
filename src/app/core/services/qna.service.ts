import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { QNA_DATA } from '../constants/qna-data';
import { QnaModel } from '../models/qna.model';

@Injectable({
  providedIn: 'root',
})
export class QnaService {
  private qnaDataSource = new BehaviorSubject<QnaModel[]>(QNA_DATA);
  qnaData$ = this.qnaDataSource.asObservable();

  private readonly showSavedQna = new BehaviorSubject<'saved' | 'all'>('all');
  showSavedQna$ = this.showSavedQna.asObservable();

  constructor() {
    const sessionData = sessionStorage.getItem('qnaData');
    const qnaDataSource = sessionData
      ? (JSON.parse(sessionData) as QnaModel[])
      : QNA_DATA;
    this.qnaDataSource.next(qnaDataSource);
  }

  public setQnaData(data: QnaModel) {
    const qnaData = this.qnaDataSource.value;
    qnaData.push(data);
    this.qnaDataSource.next(qnaData);
    sessionStorage.setItem('qnaData', JSON.stringify(qnaData));
  }

  public showSavedQnaFortheUser(flag: 'saved' | 'all') {
    this.showSavedQna.next(flag);
  }
}
