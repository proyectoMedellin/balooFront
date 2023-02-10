import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoAssignmentComponent } from './photo-assignment.component';

describe('PhotoAssignmentComponent', () => {
  let component: PhotoAssignmentComponent;
  let fixture: ComponentFixture<PhotoAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
