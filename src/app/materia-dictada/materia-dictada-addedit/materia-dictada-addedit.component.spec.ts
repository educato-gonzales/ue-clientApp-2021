import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaDictadaAddeditComponent } from './materia-dictada-addedit.component';

describe('MateriaDictadaAddeditComponent', () => {
  let component: MateriaDictadaAddeditComponent;
  let fixture: ComponentFixture<MateriaDictadaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaDictadaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaDictadaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
