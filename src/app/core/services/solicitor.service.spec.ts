import { TestBed } from '@angular/core/testing';

import { SolicitorService } from './solicitor.service';

describe('SolicitorService', () => {
  let service: SolicitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
