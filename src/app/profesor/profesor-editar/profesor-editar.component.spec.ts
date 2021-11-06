import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorEditarComponent } from './profesor-editar.component';

describe('ProfesorEditarComponent', () => {
  let component: ProfesorEditarComponent;
  let fixture: ComponentFixture<ProfesorEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
