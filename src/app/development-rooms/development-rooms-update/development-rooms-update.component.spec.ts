import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentRoomsUpdateComponent } from './development-rooms-update.component';

describe('DevelopmentRoomsUpdateComponent', () => {
  let component: DevelopmentRoomsUpdateComponent;
  let fixture: ComponentFixture<DevelopmentRoomsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentRoomsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentRoomsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
