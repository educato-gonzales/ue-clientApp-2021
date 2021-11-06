import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRudeAddeditComponent } from './registro-rude-addedit.component';

describe('RegistroRudeAddeditComponent', () => {
  let component: RegistroRudeAddeditComponent;
  let fixture: ComponentFixture<RegistroRudeAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRudeAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRudeAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
