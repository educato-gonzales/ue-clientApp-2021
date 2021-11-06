import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilAdmComponent } from './perfil-adm.component';

describe('PerfilAdmComponent', () => {
  let component: PerfilAdmComponent;
  let fixture: ComponentFixture<PerfilAdmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilAdmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
