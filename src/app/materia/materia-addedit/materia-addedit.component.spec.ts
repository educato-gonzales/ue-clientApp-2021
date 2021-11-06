import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaAddeditComponent } from './materia-addedit.component';

describe('MateriaAddeditComponent', () => {
  let component: MateriaAddeditComponent;
  let fixture: ComponentFixture<MateriaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
