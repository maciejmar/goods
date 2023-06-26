import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCanvasComponent } from './user-canvas.component';

describe('UserCanvasComponent', () => {
  let component: UserCanvasComponent;
  let fixture: ComponentFixture<UserCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
