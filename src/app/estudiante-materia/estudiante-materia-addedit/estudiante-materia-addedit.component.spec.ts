import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteMateriaAddeditComponent } from './estudiante-materia-addedit.component';

describe('EstudianteMateriaAddeditComponent', () => {
  let component: EstudianteMateriaAddeditComponent;
  let fixture: ComponentFixture<EstudianteMateriaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteMateriaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteMateriaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
