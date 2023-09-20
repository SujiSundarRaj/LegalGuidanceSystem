import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SolicitorsListComponent } from './solicitors-list/solicitors-list.component';
import { SolicitorsComponent } from './solicitors/solicitors.component';

@NgModule({
  declarations: [SolicitorsComponent, SolicitorsListComponent],
  imports: [CommonModule, ReactiveFormsModule, TypeaheadModule],
  exports: [SolicitorsComponent, SolicitorsListComponent],
})
export class SolicitorsModule {}
