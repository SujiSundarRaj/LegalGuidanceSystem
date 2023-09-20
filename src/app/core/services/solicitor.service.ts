import { Injectable } from '@angular/core';
import { Solicitor } from '../models/solicitor.model';

@Injectable({
  providedIn: 'root',
})
export class SolicitorService {
  private solicitorsListSource: Solicitor[] = [];

  public setSolicitorList(solicitorsList: Solicitor[]) {
    this.solicitorsListSource = solicitorsList;
  }

  get solicitorList() {
    return this.solicitorsListSource;
  }
}
