import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioAddeditComponent } from './registro-usuario-addedit.component';

describe('RegistroUsuarioAddeditComponent', () => {
  let component: RegistroUsuarioAddeditComponent;
  let fixture: ComponentFixture<RegistroUsuarioAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
