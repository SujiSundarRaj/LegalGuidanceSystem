import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitorsComponent } from './solicitors.component';

describe('SolicitorsComponent', () => {
  let component: SolicitorsComponent;
  let fixture: ComponentFixture<SolicitorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SolicitorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
