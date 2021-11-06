import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNotasAddeditComponent } from './reg-notas-addedit.component';

describe('RegNotasAddeditComponent', () => {
  let component: RegNotasAddeditComponent;
  let fixture: ComponentFixture<RegNotasAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNotasAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNotasAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
