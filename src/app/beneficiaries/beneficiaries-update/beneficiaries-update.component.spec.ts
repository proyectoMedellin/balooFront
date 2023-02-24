import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesUpdateComponent } from './beneficiaries-update.component';

describe('BeneficiariesUpdateComponent', () => {
  let component: BeneficiariesUpdateComponent;
  let fixture: ComponentFixture<BeneficiariesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
