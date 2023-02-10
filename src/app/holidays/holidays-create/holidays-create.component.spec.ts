import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaysCreateComponent } from './holidays-create.component';

describe('HolidaysCreateComponent', () => {
  let component: HolidaysCreateComponent;
  let fixture: ComponentFixture<HolidaysCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolidaysCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidaysCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
