import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaDictadaComponent } from './materia-dictada.component';

describe('MateriaDictadaComponent', () => {
  let component: MateriaDictadaComponent;
  let fixture: ComponentFixture<MateriaDictadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaDictadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaDictadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
