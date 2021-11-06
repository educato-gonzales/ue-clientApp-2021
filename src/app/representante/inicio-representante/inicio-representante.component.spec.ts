import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioRepresentanteComponent } from './inicio-representante.component';

describe('InicioRepresentanteComponent', () => {
  let component: InicioRepresentanteComponent;
  let fixture: ComponentFixture<InicioRepresentanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRepresentanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioRepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
