import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProfesorComponent } from './evaluacion-profesor.component';

describe('EvaluacionProfesorComponent', () => {
  let component: EvaluacionProfesorComponent;
  let fixture: ComponentFixture<EvaluacionProfesorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionProfesorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
