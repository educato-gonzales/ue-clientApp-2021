import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorAddeditComponent } from './profesor-addedit.component';

describe('ProfesorAddeditComponent', () => {
  let component: ProfesorAddeditComponent;
  let fixture: ComponentFixture<ProfesorAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesorAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
