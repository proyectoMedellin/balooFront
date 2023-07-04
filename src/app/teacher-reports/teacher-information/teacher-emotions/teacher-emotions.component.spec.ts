import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEmotionsComponent } from './teacher-emotions.component';

describe('StudentEmotionsComponent', () => {
  let component: TeacherEmotionsComponent;
  let fixture: ComponentFixture<TeacherEmotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEmotionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEmotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
