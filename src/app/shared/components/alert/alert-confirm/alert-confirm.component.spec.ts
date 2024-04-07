import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AlertConfirmComponent } from './alert-confirm.component';

describe('AlertConfirmComponent', () => {
  let component: AlertConfirmComponent;
  let fixture: ComponentFixture<AlertConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
