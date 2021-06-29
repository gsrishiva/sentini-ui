import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AGRIComponent } from './agri.component';

describe('AGRIComponent', () => {
  let component: AGRIComponent;
  let fixture: ComponentFixture<AGRIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AGRIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AGRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
