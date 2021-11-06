import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoAddeditComponent } from './foto-addedit.component';

describe('FotoAddeditComponent', () => {
  let component: FotoAddeditComponent;
  let fixture: ComponentFixture<FotoAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
