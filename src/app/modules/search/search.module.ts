import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SearchedContentComponent } from './searched-content/searched-content.component';
import {AccordionModule } from 'ngx-bootstrap/accordion';
@NgModule({
  declarations: [SearchBoxComponent, SearchedContentComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TypeaheadModule, AccordionModule],
  exports: [SearchBoxComponent],
})
export class SearchModule { }
