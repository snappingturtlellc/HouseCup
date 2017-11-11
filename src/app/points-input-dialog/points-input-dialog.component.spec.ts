import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsInputDialogComponent } from './points-input-dialog.component';

describe('PointsInputDialogComponent', () => {
  let component: PointsInputDialogComponent;
  let fixture: ComponentFixture<PointsInputDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointsInputDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsInputDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
