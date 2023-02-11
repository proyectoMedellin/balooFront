import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampuesCreateComponent } from './campues-create.component';

describe('CampuesCreateComponent', () => {
  let component: CampuesCreateComponent;
  let fixture: ComponentFixture<CampuesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampuesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampuesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
