import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEstudianteEditarComponent } from './registro-estudiante-editar.component';

describe('RegistroEstudianteEditarComponent', () => {
  let component: RegistroEstudianteEditarComponent;
  let fixture: ComponentFixture<RegistroEstudianteEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEstudianteEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEstudianteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
