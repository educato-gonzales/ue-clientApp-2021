import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RudeComponent } from './rude.component';

describe('RudeComponent', () => {
  let component: RudeComponent;
  let fixture: ComponentFixture<RudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
