import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCenterCreateComponent } from './training-center-create.component';

describe('TrainingCenterCreateComponent', () => {
  let component: TrainingCenterCreateComponent;
  let fixture: ComponentFixture<TrainingCenterCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCenterCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCenterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
