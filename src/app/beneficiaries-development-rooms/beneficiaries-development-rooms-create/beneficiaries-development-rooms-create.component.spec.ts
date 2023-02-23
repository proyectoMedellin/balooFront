import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesDevelopmentRoomsCreateComponent } from './beneficiaries-development-rooms-create.component';

describe('BeneficiariesDevelopmentRoomsCreateComponent', () => {
  let component: BeneficiariesDevelopmentRoomsCreateComponent;
  let fixture: ComponentFixture<BeneficiariesDevelopmentRoomsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesDevelopmentRoomsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesDevelopmentRoomsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
