import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LAWAREA_DATA } from 'src/app/core/constants/lawarea-data';
import { Topic } from 'src/app/core/models/search.model';

@Component({
  selector: 'app-qna-search',
  templateUrl: './qna-search.component.html',
  styleUrls: ['./qna-search.component.scss'],
})
export class QnaSearchComponent {
  qnaSearchForm: FormGroup;
  @Output() triggerSearch = new EventEmitter<string>();
  @Output() filterByCategory = new EventEmitter<number>();
  lawAreaData = LAWAREA_DATA.sort((a, b) => a.name.localeCompare(b.name));
  category: Topic[] = [];
  constructor(private fb: FormBuilder) {
    this.qnaSearchForm = this.fb.group({
      seachBoxControl: [],
      seachByCategory: [],
    });
    this.category = this.setCategory();
  }
  search() {
    console.log('this.qnaSearchForm.value ', this.qnaSearchForm.value);
    this.triggerSearch.emit(this.qnaSearchForm.value.seachBoxControl);
    if (this.qnaSearchForm.value.seachByCategory) {
      this.filterByCategory.emit(
        Number(this.qnaSearchForm.value.seachByCategory)
      );
    }
  }
  clearSearch() {
    this.qnaSearchForm.reset();
    this.triggerSearch.emit(this.qnaSearchForm.value.seachBoxControl);
    this.filterByCategory.emit(this.qnaSearchForm.value.seachByCategory);
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
