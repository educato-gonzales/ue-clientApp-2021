import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNotaAlumnoComponent } from './registro-nota-alumno.component';

describe('RegistroNotaAlumnoComponent', () => {
  let component: RegistroNotaAlumnoComponent;
  let fixture: ComponentFixture<RegistroNotaAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNotaAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNotaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
