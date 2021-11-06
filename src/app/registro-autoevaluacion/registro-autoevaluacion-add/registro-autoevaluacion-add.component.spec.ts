import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutoevaluacionAddComponent } from './registro-autoevaluacion-add.component';

describe('RegistroAutoevaluacionAddComponent', () => {
  let component: RegistroAutoevaluacionAddComponent;
  let fixture: ComponentFixture<RegistroAutoevaluacionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAutoevaluacionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAutoevaluacionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
