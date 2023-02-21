import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusUpdateComponent } from './campus-update.component';

describe('CampusUpdateComponent', () => {
  let component: CampusUpdateComponent;
  let fixture: ComponentFixture<CampusUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampusUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
