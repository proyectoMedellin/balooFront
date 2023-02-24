import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysUpdateComponent } from './holidays-update.component';

describe('HolidaysUpdateComponent', () => {
  let component: HolidaysUpdateComponent;
  let fixture: ComponentFixture<HolidaysUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
