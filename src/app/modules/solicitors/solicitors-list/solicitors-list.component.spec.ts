import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitorsListComponent } from './solicitors-list.component';

describe('SolicitorsComponent', () => {
  let component: SolicitorsListComponent;
  let fixture: ComponentFixture<SolicitorsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitorsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
