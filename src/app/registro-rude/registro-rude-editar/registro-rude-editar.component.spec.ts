import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRudeEditarComponent } from './registro-rude-editar.component';

describe('RegistroRudeEditarComponent', () => {
  let component: RegistroRudeEditarComponent;
  let fixture: ComponentFixture<RegistroRudeEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRudeEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRudeEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
