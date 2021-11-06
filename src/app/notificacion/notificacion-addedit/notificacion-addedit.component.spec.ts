import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionAddeditComponent } from './notificacion-addedit.component';

describe('NotificacionAddeditComponent', () => {
  let component: NotificacionAddeditComponent;
  let fixture: ComponentFixture<NotificacionAddeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionAddeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionAddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
