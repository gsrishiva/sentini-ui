import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CPVCComponent } from './cpvc.component';

describe('CPVCComponent', () => {
  let component: CPVCComponent;
  let fixture: ComponentFixture<CPVCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CPVCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CPVCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
