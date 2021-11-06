import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionAddeditComponent } from './calificacion-addedit.component';

describe('CalificacionAddeditComponent', () => {
  let component: CalificacionAddeditComponent;
  let fixture: ComponentFixture<CalificacionAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalificacionAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalificacionAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
