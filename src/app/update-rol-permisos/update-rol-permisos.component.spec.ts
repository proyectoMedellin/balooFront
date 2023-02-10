import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRolPermisosComponent } from './update-rol-permisos.component';

describe('UpdateRolPermisosComponent', () => {
  let component: UpdateRolPermisosComponent;
  let fixture: ComponentFixture<UpdateRolPermisosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRolPermisosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRolPermisosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
