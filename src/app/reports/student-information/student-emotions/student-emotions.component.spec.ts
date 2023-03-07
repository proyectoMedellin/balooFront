import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEmotionsComponent } from './student-emotions.component';

describe('StudentEmotionsComponent', () => {
  let component: StudentEmotionsComponent;
  let fixture: ComponentFixture<StudentEmotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEmotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
