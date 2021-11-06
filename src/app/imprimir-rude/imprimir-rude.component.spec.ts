import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirRudeComponent } from './imprimir-rude.component';

describe('ImprimirRudeComponent', () => {
  let component: ImprimirRudeComponent;
  let fixture: ComponentFixture<ImprimirRudeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirRudeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirRudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
