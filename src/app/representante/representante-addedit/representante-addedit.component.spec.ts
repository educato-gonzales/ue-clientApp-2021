import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentanteAddeditComponent } from './representante-addedit.component';

describe('RepresentanteAddeditComponent', () => {
  let component: RepresentanteAddeditComponent;
  let fixture: ComponentFixture<RepresentanteAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepresentanteAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentanteAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
