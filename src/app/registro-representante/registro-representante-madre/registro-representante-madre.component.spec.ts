import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRepresentanteMadreComponent } from './registro-representante-madre.component';

describe('RegistroRepresentanteMadreComponent', () => {
  let component: RegistroRepresentanteMadreComponent;
  let fixture: ComponentFixture<RegistroRepresentanteMadreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRepresentanteMadreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRepresentanteMadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
