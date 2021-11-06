import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaAddeditComponent } from './nota-addedit.component';

describe('NotaAddeditComponent', () => {
  let component: NotaAddeditComponent;
  let fixture: ComponentFixture<NotaAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
