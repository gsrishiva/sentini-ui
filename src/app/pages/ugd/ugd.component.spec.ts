import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UGDComponent } from './ugd.component';

describe('UGDComponent', () => {
  let component: UGDComponent;
  let fixture: ComponentFixture<UGDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UGDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UGDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
