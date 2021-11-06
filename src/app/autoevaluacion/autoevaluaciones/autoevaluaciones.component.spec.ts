import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoevaluacionesComponent } from './autoevaluaciones.component';

describe('AutoevaluacionesComponent', () => {
  let component: AutoevaluacionesComponent;
  let fixture: ComponentFixture<AutoevaluacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoevaluacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoevaluacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
