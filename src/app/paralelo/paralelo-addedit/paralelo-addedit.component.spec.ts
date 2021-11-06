import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParaleloAddeditComponent } from './paralelo-addedit.component';

describe('ParaleloAddeditComponent', () => {
  let component: ParaleloAddeditComponent;
  let fixture: ComponentFixture<ParaleloAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParaleloAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParaleloAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
