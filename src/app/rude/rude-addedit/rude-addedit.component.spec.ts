import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RudeAddeditComponent } from './rude-addedit.component';

describe('RudeAddeditComponent', () => {
  let component: RudeAddeditComponent;
  let fixture: ComponentFixture<RudeAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RudeAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RudeAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
