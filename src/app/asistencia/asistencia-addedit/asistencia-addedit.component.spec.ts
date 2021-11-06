import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaAddeditComponent } from './asistencia-addedit.component';

describe('AsistenciaAddeditComponent', () => {
  let component: AsistenciaAddeditComponent;
  let fixture: ComponentFixture<AsistenciaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsistenciaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsistenciaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
