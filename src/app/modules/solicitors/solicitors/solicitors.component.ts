import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { LAWAREA_DATA } from 'src/app/core/constants/lawarea-data';
import { SOLICITOR_DATA } from 'src/app/core/constants/solicitors-data';
import {
  LegalIssueDropdown,
  Solicitor,
} from 'src/app/core/models/solicitor.model';
import { SolicitorService } from 'src/app/core/services/solicitor.service';

@Component({
  selector: 'app-solicitors',
  templateUrl: './solicitors.component.html',
  styleUrls: ['./solicitors.component.scss'],
})
export class SolicitorsComponent {
  showFormElements = false;
  legalIssues = LAWAREA_DATA.reduce((prev, curr) => {
    const legalIssues = curr.areas?.map((area) => ({
      ...area,
      parent: curr.name,
    }));
    prev = legalIssues ? prev.concat(legalIssues) : prev;
    return prev;
  }, [] as LegalIssueDropdown[]);
  myForm: FormGroup;
  searchBoxSource = SOLICITOR_DATA.map((data) => {
    return {
      id: data.SRAID,
      location: `${data.address.town}, ${data.address.postcode}`,
      town: data.address.town,
      postcode: data.address.postcode,
    };
  });
  searchedContent:
    | { id: string; location: string; town: string; postcode: string }
    | undefined;
  solicitorsList: Solicitor[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private readonly solicitorService: SolicitorService
  ) {
    this.myForm = this.fb.group({
      selectedLegalIssue: [0],
      location: [''],
    });
  }

  toggleFormElements() {
    this.showFormElements = !this.showFormElements;
  }

  search() {
    this.solicitorsList = SOLICITOR_DATA.filter((data) => {
      return this.searchedContent
        ? data.address.town.includes(this.searchedContent.town)
        : true;
    })
      .filter((data) =>
        this.myForm.value.selectedLegalIssue
          ? data.area.some(
              (area) => area.id === Number(this.myForm.value.selectedLegalIssue)
            )
          : true
      )
      .map((item, index) => {
        const selectedLegalIssue = this.legalIssues.find(
          (l) => l.id === Number(this.myForm.value.selectedLegalIssue)
        );
        const solicitor = {
          ...item,
          index,
          legalIssueCategory: {
            parent: selectedLegalIssue?.parent ?? '',
            child: selectedLegalIssue?.name ?? '',
          },
        };
        if (item.SRAID === this.searchedContent?.id) {
          solicitor.index = -1;
        }
        return solicitor;
      })
      .filter(
        (obj, arrIndex, self) =>
          arrIndex === self.findIndex((item) => item.index === obj.index)
      )
      .sort((a, b) => a.index - b.index);
    this.solicitorService.setSolicitorList(this.solicitorsList);
    this.router.navigate(['solicitor-list']);
  }

  typeaheadOnSelect(event: TypeaheadMatch) {
    console.log('event ==> ', event);
    this.searchedContent = event.item;
  }
}
