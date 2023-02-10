import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesDevelopmentRoomsComponent } from './beneficiaries-development-rooms.component';

describe('BeneficiariesDevelopmentRoomsComponent', () => {
  let component: BeneficiariesDevelopmentRoomsComponent;
  let fixture: ComponentFixture<BeneficiariesDevelopmentRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesDevelopmentRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesDevelopmentRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
