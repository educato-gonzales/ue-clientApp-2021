import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioAddeditComponent } from './usuario-addedit.component';

describe('UsuarioAddeditComponent', () => {
  let component: UsuarioAddeditComponent;
  let fixture: ComponentFixture<UsuarioAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
