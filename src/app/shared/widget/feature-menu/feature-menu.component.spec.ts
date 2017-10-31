import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureMenuComponent } from './feature-menu.component';

describe('FeatureMenuComponent', () => {
  let component: FeatureMenuComponent;
  let fixture: ComponentFixture<FeatureMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeatureMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
