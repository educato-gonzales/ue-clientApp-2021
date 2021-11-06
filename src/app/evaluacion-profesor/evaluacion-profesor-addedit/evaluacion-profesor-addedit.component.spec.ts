import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionProfesorAddeditComponent } from './evaluacion-profesor-addedit.component';

describe('EvaluacionProfesorAddeditComponent', () => {
  let component: EvaluacionProfesorAddeditComponent;
  let fixture: ComponentFixture<EvaluacionProfesorAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionProfesorAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionProfesorAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
