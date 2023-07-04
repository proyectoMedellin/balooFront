import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReportsComponent } from './teacher-reports.component';

describe('ReportsComponent', () => {
  let component: TeacherReportsComponent;
  let fixture: ComponentFixture<TeacherReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
