import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAddeditComponent } from './horario-addedit.component';

describe('HorarioAddeditComponent', () => {
  let component: HorarioAddeditComponent;
  let fixture: ComponentFixture<HorarioAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
