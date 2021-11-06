import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstudianteAddeditComponent } from './registro-estudiante-addedit.component';

describe('RegistroEstudianteAddeditComponent', () => {
  let component: RegistroEstudianteAddeditComponent;
  let fixture: ComponentFixture<RegistroEstudianteAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEstudianteAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEstudianteAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
