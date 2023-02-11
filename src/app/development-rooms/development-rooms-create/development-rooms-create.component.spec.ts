import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentRoomsCreateComponent } from './development-rooms-create.component';

describe('DevelopmentRoomsCreateComponent', () => {
  let component: DevelopmentRoomsCreateComponent;
  let fixture: ComponentFixture<DevelopmentRoomsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentRoomsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentRoomsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
