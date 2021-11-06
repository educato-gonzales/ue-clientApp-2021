import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteAddeditComponent } from './estudiante-addedit.component';

describe('EstudianteAddeditComponent', () => {
  let component: EstudianteAddeditComponent;
  let fixture: ComponentFixture<EstudianteAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudianteAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudianteAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
