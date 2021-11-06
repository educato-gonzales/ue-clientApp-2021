import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutoevaluacionComponent } from './registro-autoevaluacion.component';

describe('RegistroAutoevaluacionComponent', () => {
  let component: RegistroAutoevaluacionComponent;
  let fixture: ComponentFixture<RegistroAutoevaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAutoevaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAutoevaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
