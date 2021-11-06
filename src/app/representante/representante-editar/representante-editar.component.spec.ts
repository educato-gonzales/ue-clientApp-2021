import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteEditarComponent } from './representante-editar.component';

describe('RepresentanteEditarComponent', () => {
  let component: RepresentanteEditarComponent;
  let fixture: ComponentFixture<RepresentanteEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentanteEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
