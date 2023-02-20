import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCenterUpdateComponent } from './training-center-update.component';

describe('TrainingCenterUpdateComponent', () => {
  let component: TrainingCenterUpdateComponent;
  let fixture: ComponentFixture<TrainingCenterUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCenterUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCenterUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
