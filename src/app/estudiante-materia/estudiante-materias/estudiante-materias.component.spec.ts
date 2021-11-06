import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteMateriasComponent } from './estudiante-materias.component';

describe('EstudianteMateriasComponent', () => {
  let component: EstudianteMateriasComponent;
  let fixture: ComponentFixture<EstudianteMateriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteMateriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
