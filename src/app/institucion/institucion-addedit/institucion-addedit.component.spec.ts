import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionAddeditComponent } from './institucion-addedit.component';

describe('InstitucionAddeditComponent', () => {
  let component: InstitucionAddeditComponent;
  let fixture: ComponentFixture<InstitucionAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
