import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoAddeditComponent } from './periodo-addedit.component';

describe('PeriodoAddeditComponent', () => {
  let component: PeriodoAddeditComponent;
  let fixture: ComponentFixture<PeriodoAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeriodoAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeriodoAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
