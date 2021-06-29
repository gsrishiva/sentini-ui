import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerproductsComponent } from './dealerproducts.component';

describe('DealerproductsComponent', () => {
  let component: DealerproductsComponent;
  let fixture: ComponentFixture<DealerproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
