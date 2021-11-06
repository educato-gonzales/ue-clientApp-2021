import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEvaluacionAlumnoComponent } from './registro-evaluacion-alumno.component';

describe('RegistroEvaluacionAlumnoComponent', () => {
  let component: RegistroEvaluacionAlumnoComponent;
  let fixture: ComponentFixture<RegistroEvaluacionAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEvaluacionAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEvaluacionAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
