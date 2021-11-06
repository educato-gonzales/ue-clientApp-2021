import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioVistaComponent } from './calendario-vista.component';

describe('CalendarioVistaComponent', () => {
  let component: CalendarioVistaComponent;
  let fixture: ComponentFixture<CalendarioVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
