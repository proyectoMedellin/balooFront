import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalAgentsCreateComponent } from './educational-agents-create.component';

describe('EducationalAgentsCreateComponent', () => {
  let component: EducationalAgentsCreateComponent;
  let fixture: ComponentFixture<EducationalAgentsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationalAgentsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalAgentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
