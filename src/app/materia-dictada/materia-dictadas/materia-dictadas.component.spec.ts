import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaDictadasComponent } from './materia-dictadas.component';

describe('MateriaDictadasComponent', () => {
  let component: MateriaDictadasComponent;
  let fixture: ComponentFixture<MateriaDictadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaDictadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaDictadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
