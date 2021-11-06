import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteMateriaComponent } from './estudiante-materia.component';

describe('EstudianteMateriaComponent', () => {
  let component: EstudianteMateriaComponent;
  let fixture: ComponentFixture<EstudianteMateriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteMateriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
