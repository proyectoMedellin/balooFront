import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCaptchatComponent } from './login-captchat.component';

describe('LoginCaptchatComponent', () => {
  let component: LoginCaptchatComponent;
  let fixture: ComponentFixture<LoginCaptchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginCaptchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginCaptchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
