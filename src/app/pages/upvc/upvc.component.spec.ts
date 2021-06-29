import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UPVCComponent } from './upvc.component';

describe('UPVCComponent', () => {
  let component: UPVCComponent;
  let fixture: ComponentFixture<UPVCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UPVCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UPVCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
