import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { LAWAREA_DATA } from 'src/app/core/constants/lawarea-data';
import { QnaModel } from 'src/app/core/models/qna.model';
import { Topic } from 'src/app/core/models/search.model';
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
  filterSearchedContent = new BehaviorSubject<string>('');
  filterCategory = new BehaviorSubject<number | null>(null);
  filterByRelatedTopic = new BehaviorSubject<number | undefined>(undefined);
  notKeywords: string[] = [
    'how',
    'of',
    'in',
    'to',
    'what',
    'or',
    'is',
    'and',
    'was',
    'if',
    'but',
    'at',
    'that',
    'it',
    'this',
  ];
  relatedTopics: Topic[] = [];
  lawAreaData = LAWAREA_DATA.sort((a, b) => a.name.localeCompare(b.name));
  qnaList$: Observable<QnaModel[]> = combineLatest([
    this.qnaService.qnaData$,
    this.showSavedQna$,
    this.currentUser$,
    this.filterSearchedContent.asObservable(),
    this.filterCategory.asObservable(),
    this.filterByRelatedTopic.asObservable(),
  ]).pipe(
    map(
      ([
        qnaData,
        showSavedQna,
        currentUser,
        filterSearch,
        category,
        relatedTopic,
      ]) => {
        let filteredData = qnaData;
        if (showSavedQna === 'saved' && currentUser) {
          filteredData = qnaData.filter((qnaData) =>
            currentUser?.savedQna?.some((x) => qnaData.id === x)
          );
        }

        if (category) {
          filteredData = filteredData.filter(
            (qnaData) => qnaData.category.id == category
          );
        }
        if (relatedTopic) {
          filteredData = filteredData.filter((qnaData) => {
            return qnaData.subCategory?.id === relatedTopic;
          });
        }
        let searchKeyWords: string[] = filterSearch
          ? filterSearch.split(' ')
          : [];
        searchKeyWords = searchKeyWords.filter((val) => {
          return !this.notKeywords.includes(val.toLowerCase());
        });
        return filteredData
          .filter((data) => {
            return searchKeyWords.length > 0
              ? searchKeyWords.some((key) => data.question.includes(key))
              : true;
          })
          .filter(
            (obj, arrIndex, self) =>
              arrIndex === self.findIndex((item) => item.id === obj.id)
          );
      }
    ),
    map((qnaData) => {
      return qnaData
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .reverse();
    }),
    tap((qnaData) => this.setRelatedTopics(qnaData))
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

  filterQnaList(event: string) {
    this.filterSearchedContent.next(event);
  }

  filterByCategory(event: number) {
    this.filterCategory.next(event);
  }

  setRelatedTopics(qnaData: QnaModel[]) {
    this.relatedTopics = qnaData
      .reduce((prev, curr) => {
        const lawAreaData = this.lawAreaData.find(
          (area) => area.id === curr.category.id
        );
        prev = lawAreaData ? prev.concat(lawAreaData.areas as Topic[]) : prev;
        return prev;
      }, [] as Topic[])
      .filter(
        (obj, arrIndex, self) =>
          arrIndex === self.findIndex((item) => item.id === obj.id)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  filterByTopic(topicId: number) {
    this.filterByRelatedTopic.next(topicId);
  }

  clearRelatedTopic() {
    this.filterByRelatedTopic.next(undefined);
  }
}
