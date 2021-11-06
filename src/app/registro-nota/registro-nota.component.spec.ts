import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroNotaComponent } from './registro-nota.component';

describe('RegistroNotaComponent', () => {
  let component: RegistroNotaComponent;
  let fixture: ComponentFixture<RegistroNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
