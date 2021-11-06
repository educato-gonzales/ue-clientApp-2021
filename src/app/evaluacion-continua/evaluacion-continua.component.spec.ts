import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionContinuaComponent } from './evaluacion-continua.component';

describe('EvaluacionContinuaComponent', () => {
  let component: EvaluacionContinuaComponent;
  let fixture: ComponentFixture<EvaluacionContinuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluacionContinuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionContinuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
