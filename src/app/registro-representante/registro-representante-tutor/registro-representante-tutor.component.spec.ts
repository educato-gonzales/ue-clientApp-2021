import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroRepresentanteTutorComponent } from './registro-representante-tutor.component';

describe('RegistroRepresentanteTutorComponent', () => {
  let component: RegistroRepresentanteTutorComponent;
  let fixture: ComponentFixture<RegistroRepresentanteTutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroRepresentanteTutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroRepresentanteTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
