import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLoadFilesComponent } from './users-load-files.component';

describe('UsersLoadFilesComponent', () => {
  let component: UsersLoadFilesComponent;
  let fixture: ComponentFixture<UsersLoadFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersLoadFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLoadFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
