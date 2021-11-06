import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRudeComponent } from './registro-rude.component';

describe('RegistroRudeComponent', () => {
  let component: RegistroRudeComponent;
  let fixture: ComponentFixture<RegistroRudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
