import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolAddeditComponent } from './rol-addedit.component';

describe('RolAddeditComponent', () => {
  let component: RolAddeditComponent;
  let fixture: ComponentFixture<RolAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
