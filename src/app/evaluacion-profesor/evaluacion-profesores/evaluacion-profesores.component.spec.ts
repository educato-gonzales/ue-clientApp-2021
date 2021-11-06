import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProfesoresComponent } from './evaluacion-profesores.component';

describe('EvaluacionProfesoresComponent', () => {
  let component: EvaluacionProfesoresComponent;
  let fixture: ComponentFixture<EvaluacionProfesoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionProfesoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
