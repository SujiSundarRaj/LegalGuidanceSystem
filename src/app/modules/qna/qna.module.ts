import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { QnaFormComponent } from './qna-form/qna-form.component';
import { QnaListComponent } from './qna-list/qna-list.component';
import { QnaSearchComponent } from './qna-search/qna-search.component';

@NgModule({
  declarations: [QnaSearchComponent, QnaListComponent, QnaFormComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, RouterModule],
  exports: [QnaSearchComponent, QnaListComponent, QnaFormComponent],
})
export class QnaModule {}
