import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoevaluacionAddeditComponent } from './autoevaluacion-addedit.component';

describe('AutoevaluacionAddeditComponent', () => {
  let component: AutoevaluacionAddeditComponent;
  let fixture: ComponentFixture<AutoevaluacionAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoevaluacionAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoevaluacionAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
