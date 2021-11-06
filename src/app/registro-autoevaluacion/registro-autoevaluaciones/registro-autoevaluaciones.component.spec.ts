import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutoevaluacionesComponent } from './registro-autoevaluaciones.component';

describe('RegistroAutoevaluacionesComponent', () => {
  let component: RegistroAutoevaluacionesComponent;
  let fixture: ComponentFixture<RegistroAutoevaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAutoevaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAutoevaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
