import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QnaSearchComponent } from './qna-search.component';

describe('QnaComponent', () => {
  let component: QnaSearchComponent;
  let fixture: ComponentFixture<QnaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QnaSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QnaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
