import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEvaluacionAlumnoEditComponent } from './registro-evaluacion-alumno-edit.component';

describe('RegistroEvaluacionAlumnoEditComponent', () => {
  let component: RegistroEvaluacionAlumnoEditComponent;
  let fixture: ComponentFixture<RegistroEvaluacionAlumnoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEvaluacionAlumnoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEvaluacionAlumnoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
