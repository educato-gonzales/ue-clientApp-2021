import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegNotasComponent } from './reg-notas.component';

describe('RegNotasComponent', () => {
  let component: RegNotasComponent;
  let fixture: ComponentFixture<RegNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
