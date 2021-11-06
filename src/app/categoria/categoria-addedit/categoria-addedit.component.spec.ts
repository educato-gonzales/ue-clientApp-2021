import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAddeditComponent } from './categoria-addedit.component';

describe('CategoriaAddeditComponent', () => {
  let component: CategoriaAddeditComponent;
  let fixture: ComponentFixture<CategoriaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
