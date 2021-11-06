import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroAddeditComponent } from './parametro-addedit.component';

describe('ParametroAddeditComponent', () => {
  let component: ParametroAddeditComponent;
  let fixture: ComponentFixture<ParametroAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametroAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametroAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
