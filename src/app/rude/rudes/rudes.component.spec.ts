import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RudesComponent } from './rudes.component';

describe('RudesComponent', () => {
  let component: RudesComponent;
  let fixture: ComponentFixture<RudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
