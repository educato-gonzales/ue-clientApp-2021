import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNotassComponent } from './reg-notass.component';

describe('RegNotassComponent', () => {
  let component: RegNotassComponent;
  let fixture: ComponentFixture<RegNotassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNotassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNotassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
