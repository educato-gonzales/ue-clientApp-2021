import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRepresentanteComponent } from './login-representante.component';

describe('LoginRepresentanteComponent', () => {
  let component: LoginRepresentanteComponent;
  let fixture: ComponentFixture<LoginRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
