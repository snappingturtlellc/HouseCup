import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderBoardCardComponent } from './leader-board-card.component';

describe('LeaderBoardCardComponent', () => {
  let component: LeaderBoardCardComponent;
  let fixture: ComponentFixture<LeaderBoardCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderBoardCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderBoardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
