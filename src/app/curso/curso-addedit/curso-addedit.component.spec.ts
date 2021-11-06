import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoAddeditComponent } from './curso-addedit.component';

describe('CursoAddeditComponent', () => {
  let component: CursoAddeditComponent;
  let fixture: ComponentFixture<CursoAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CursoAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
