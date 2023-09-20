import { Component, Input } from '@angular/core';
import { SearchResult } from 'src/app/core/models/search.model';

@Component({
  selector: 'app-searched-content',
  templateUrl: './searched-content.component.html',
  styleUrls: ['./searched-content.component.scss'],
})
export class SearchedContentComponent {
  @Input() searchedList: SearchResult[] = [];
  @Input() searchedContent: SearchResult | undefined;

  isOpen(isExpanded: boolean, index: number) {
    if (this.searchedList[index]) {
      this.searchedList[index].isExpanded = isExpanded;
    }
  }
}
