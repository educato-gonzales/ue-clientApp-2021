import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNotaAutoevaluacionComponent } from './registro-nota-autoevaluacion.component';

describe('RegistroNotaAutoevaluacionComponent', () => {
  let component: RegistroNotaAutoevaluacionComponent;
  let fixture: ComponentFixture<RegistroNotaAutoevaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNotaAutoevaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNotaAutoevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
