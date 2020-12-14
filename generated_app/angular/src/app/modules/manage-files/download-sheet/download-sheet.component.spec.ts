import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SheetbottomComponent } from './sheetbottom.component';

describe('SheetbottomComponent', () => {
  let component: SheetbottomComponent;
  let fixture: ComponentFixture<SheetbottomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetbottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
