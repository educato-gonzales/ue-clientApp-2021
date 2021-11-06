import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteCursoAddeditComponent } from './estudiante-curso-addedit.component';

describe('EstudianteCursoAddeditComponent', () => {
  let component: EstudianteCursoAddeditComponent;
  let fixture: ComponentFixture<EstudianteCursoAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteCursoAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteCursoAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
