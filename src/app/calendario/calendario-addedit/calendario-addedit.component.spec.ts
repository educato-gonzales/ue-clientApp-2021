import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAddeditComponent } from './calendario-addedit.component';

describe('CalendarioAddeditComponent', () => {
  let component: CalendarioAddeditComponent;
  let fixture: ComponentFixture<CalendarioAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarioAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarioAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
