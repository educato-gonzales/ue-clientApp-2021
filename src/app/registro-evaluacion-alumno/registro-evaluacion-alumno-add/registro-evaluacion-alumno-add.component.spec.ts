import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEvaluacionAlumnoAddComponent } from './registro-evaluacion-alumno-add.component';

describe('RegistroEvaluacionAlumnoAddComponent', () => {
  let component: RegistroEvaluacionAlumnoAddComponent;
  let fixture: ComponentFixture<RegistroEvaluacionAlumnoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEvaluacionAlumnoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEvaluacionAlumnoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
