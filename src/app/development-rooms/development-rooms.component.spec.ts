import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentRoomsComponent } from './development-rooms.component';

describe('DevelopmentRoomsComponent', () => {
  let component: DevelopmentRoomsComponent;
  let fixture: ComponentFixture<DevelopmentRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevelopmentRoomsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
