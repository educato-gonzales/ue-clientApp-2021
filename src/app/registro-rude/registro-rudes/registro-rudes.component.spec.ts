import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRudesComponent } from './registro-rudes.component';

describe('RegistroRudesComponent', () => {
  let component: RegistroRudesComponent;
  let fixture: ComponentFixture<RegistroRudesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRudesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
