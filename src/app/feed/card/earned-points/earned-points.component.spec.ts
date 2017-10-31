import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedPointsComponent } from './earned-points.component';

describe('EarnedPointsComponent', () => {
  let component: EarnedPointsComponent;
  let fixture: ComponentFixture<EarnedPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnedPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
