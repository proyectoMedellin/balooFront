import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalAgentsUpdateComponent } from './educational-agents-update.component';

describe('EducationalAgentsUpdateComponent', () => {
  let component: EducationalAgentsUpdateComponent;
  let fixture: ComponentFixture<EducationalAgentsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalAgentsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalAgentsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
