import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesDevelopmentRoomsUpdateComponent } from './beneficiaries-development-rooms-update.component';

describe('BeneficiariesDevelopmentRoomsUpdateComponent', () => {
  let component: BeneficiariesDevelopmentRoomsUpdateComponent;
  let fixture: ComponentFixture<BeneficiariesDevelopmentRoomsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesDevelopmentRoomsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesDevelopmentRoomsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
