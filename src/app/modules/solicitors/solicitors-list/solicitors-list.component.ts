import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accreditation, Solicitor } from 'src/app/core/models/solicitor.model';
import { SolicitorService } from 'src/app/core/services/solicitor.service';

@Component({
  selector: 'app-solicitors-list',
  templateUrl: './solicitors-list.component.html',
  styleUrls: ['./solicitors-list.component.scss'],
})
export class SolicitorsListComponent {
  solicitorsList = this.solicitorService.solicitorList;
  currentPage = 0;
  accList = this.setAccList(this.solicitorsList);
  myForm: FormGroup;

  constructor(
    private readonly solicitorService: SolicitorService,
    private fb: FormBuilder
  ) {
    this.myForm = this.fb.group({
      title: [],
      accrediations: [],
      yearsLicensed: [],
      sraId: [],
    });
  }

  setAccList(solicitorList: Solicitor[]): Accreditation[] {
    return solicitorList
      .reduce((acc, curr) => {
        acc = acc.concat(curr.accreditations);
        return acc;
      }, [] as Accreditation[])
      .filter(
        (obj, arrIndex, self) =>
          arrIndex === self.findIndex((item) => item.id === obj.id)
      );
  }

  filterByTitle(solicitor: Solicitor): boolean {
    const title = this.myForm.value.title?.toLowerCase();
    return title ? solicitor.title.toLowerCase().includes(title) : true;
  }

  filterByAccreditations(solicitor: Solicitor): boolean {
    return this.myForm.value.accrediations
      ? solicitor.accreditations.some(
          (acc) => acc.id === this.myForm.value.accrediations
        )
      : true;
  }

  filterBySraId(solicitor: Solicitor): boolean {
    const sraId = this.myForm.value.sraId;
    return sraId ? solicitor.SRAID === sraId : true;
  }

  filterByYearsLicensed(solicitor: Solicitor): boolean {
    return this.myForm.value.yearsLicensed
      ? this.yearsLicensed(solicitor.AuthorisationDate) ===
          this.myForm.value.yearsLicensed
      : true;
  }

  apply() {
    console.log('myForm ==> ', this.myForm.value);
    this.applyFilters();
  }

  applyFilters() {
    this.solicitorsList = this.solicitorService.solicitorList.filter(
      (solicitor) =>
        this.filterByTitle(solicitor) &&
        this.filterByAccreditations(solicitor) &&
        this.filterBySraId(solicitor) &&
        this.filterByYearsLicensed(solicitor)
    );
    this.currentPage = 0;
  }

  reset() {
    this.myForm.reset();
    this.applyFilters();
  }

  prev() {
    if (this.currentPage !== 0) {
      this.currentPage--;
    }
  }

  next() {
    if (this.currentPage !== this.solicitorsList.length - 1) {
      this.currentPage++;
    }
  }

  setPageNo(pageNo: number) {
    this.currentPage = pageNo;
  }

  yearsLicensed(date: string): number {
    return new Date().getFullYear() - new Date(date).getFullYear();
  }
}
