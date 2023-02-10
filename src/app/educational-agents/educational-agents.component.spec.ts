import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalAgentsComponent } from './educational-agents.component';

describe('EducationalAgentsComponent', () => {
  let component: EducationalAgentsComponent;
  let fixture: ComponentFixture<EducationalAgentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalAgentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalAgentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
