import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Subscription, distinctUntilChanged, pairwise, tap } from 'rxjs';
import { LAWAREA_DATA } from 'src/app/core/constants/lawarea-data';
import { SEARCH_DATA } from 'src/app/core/constants/search-datasource.constants';
import { SearchResult, Topic } from 'src/app/core/models/search.model';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  myForm: FormGroup;
  searchedContent: SearchResult | undefined;
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
  searchedAnswersList: SearchResult[] = [];
  searchBy: any = {};
  searchBoxSource = SEARCH_DATA.map((val, index) => ({
    ...val,
    index,
    isExpanded: false,
  }));

  lawAreaData = LAWAREA_DATA.sort((a, b) => a.name.localeCompare(b.name));

  relatedTopics: Topic[] = [];

  private sub = new Subscription();
  constructor(private readonly fb: FormBuilder) {
    this.myForm = this.fb.group({
      state: [''],
    });
  }

  ngOnInit(): void {
    this.sub.add(
      this.myForm.valueChanges
        .pipe(
          distinctUntilChanged(),
          pairwise(),
          tap(([prev, current]) => {
            this.searchBy = {
              prev: prev.state,
              current: current.state,
            };
          })
        )
        .subscribe()
    );
  }

  typeaheadOnSelect(event: TypeaheadMatch) {
    this.searchedContent = event.item;
    this.searchBoxSource = this.searchBoxSource.map((item) => {
      if (item.index === event.item.index) {
        item.index = -1;
        item.isExpanded = true;
      }
      return item;
    });
    const searchBy =
      this.searchBy.current === event.item.qn
        ? this.searchBy.prev
        : this.searchBy.current;
    this.searchResult(searchBy);
  }

  search() {
    this.searchResult(this.searchBy.current);
  }

  searchResult(searchBy: any) {
    let searchKeyWords: string[] = searchBy?.split(' ') ?? [];
    searchKeyWords = searchKeyWords.filter((val) => {
      return !this.notKeywords.includes(val.toLowerCase());
    });

    this.searchedAnswersList = searchKeyWords
      .reduce((searchResult, key) => {
        const searchAnswers = this.searchBoxSource.filter((item) =>
          item.an.includes(key)
        );
        searchResult = searchResult
          .concat(searchAnswers)
          .filter(
            (obj, arrIndex, self) =>
              arrIndex === self.findIndex((item) => item.index === obj.index)
          );
        return searchResult;
      }, [] as SearchResult[])
      .sort((a, b) => a.index - b.index);
    this.setRelatedTopics();
  }

  setRelatedTopics() {
    this.relatedTopics = this.searchedAnswersList
      .reduce((prev, curr) => {
        const lawAreaData = this.lawAreaData.find(
          (area) => area.id === curr.area.id
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

  browseByLegalArea(id: number) {
    this.searchedAnswersList = this.searchBoxSource.filter((item) => {
      return item.area.id === id;
    });
    this.setRelatedTopics();
  }

  browseByTopic(id: number) {
    this.searchedAnswersList = this.searchBoxSource.filter((item) => {
      return item.topic.id === id;
    });
  }

  clearSearch() {
    this.searchedContent = undefined;
    this.searchedAnswersList = [];
    this.myForm.reset();
  }

  clearInput() {
    this.myForm.reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
