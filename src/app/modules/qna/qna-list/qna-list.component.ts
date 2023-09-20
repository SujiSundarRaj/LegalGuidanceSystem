import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, combineLatest, map } from 'rxjs';
import { QnaModel } from 'src/app/core/models/qna.model';
import { User } from 'src/app/core/models/user.model';
import { QnaService } from 'src/app/core/services/qna.service';
import { UserRegistrationService } from 'src/app/core/services/user-registration.service';
import { QnaFormComponent } from '../qna-form/qna-form.component';

@Component({
  selector: 'app-qna-list',
  templateUrl: './qna-list.component.html',
  styleUrls: ['./qna-list.component.scss'],
})
export class QnaListComponent {
  showFormElements = false;
  currentUser$ = this.userService.currentUser$;
  showSavedQna$ = this.qnaService.showSavedQna$;
  qnaList$: Observable<QnaModel[]> = combineLatest([
    this.qnaService.qnaData$,
    this.showSavedQna$,
    this.currentUser$,
  ]).pipe(
    map(([qnaData, showSavedQna, currentUser]) => {
      if (showSavedQna === 'saved' && currentUser) {
        return qnaData.filter((qnaData) =>
          currentUser?.savedQna?.some((x) => qnaData.id === x)
        );
      }
      return qnaData;
    }),
    map((qnaData) => {
      return qnaData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reverse();
    })
  );
  dialogRef: any;
  bsModalRef?: BsModalRef;
  loggedIn = sessionStorage.getItem('loggedIn') === 'true' ? true : false;
  constructor(
    private readonly qnaService: QnaService,
    private readonly userService: UserRegistrationService,
    private readonly modalService: BsModalService
  ) {}

  askQuestion(): void {
    this.bsModalRef = this.modalService.show(
      QnaFormComponent,
      Object.assign({}, { class: 'modal-lg' })
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  isSaved(user: User, qnaData: QnaModel): boolean {
    return user.savedQna
      ? user.savedQna.some((savedQna) => savedQna === qnaData.id)
      : false;
  }

  saveQna(user: User, qnaData: QnaModel) {
    const savedQna = user.savedQna ?? [];
    savedQna.push(qnaData.id);
    const updateUser: User = {
      ...user,
      savedQna,
    };
    this.userService.updateUser(updateUser);
  }

  unsaveQna(user: User, qnaData: QnaModel) {
    const savedQna = user.savedQna ?? [];
    const savedQnaIndex = savedQna.findIndex((id) => qnaData.id === id);
    savedQna?.splice(savedQnaIndex, 1);
    const updateUser: User = {
      ...user,
      savedQna,
    };
    this.userService.updateUser(updateUser);
  }

  showSavedQnaForTheUser(showSavedQna: 'saved' | 'all') {
    const flag = showSavedQna === 'saved' ? 'all' : 'saved';
    this.qnaService.showSavedQnaFortheUser(flag);
  }
}
