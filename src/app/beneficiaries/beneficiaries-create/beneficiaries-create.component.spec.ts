import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariesCreateComponent } from './beneficiaries-create.component';

describe('BeneficiariesCreateComponent', () => {
  let component: BeneficiariesCreateComponent;
  let fixture: ComponentFixture<BeneficiariesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiariesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
