import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlurProgressComponent } from './blur-progress.component';

describe('BlurProgressComponent', () => {
  let component: BlurProgressComponent;
  let fixture: ComponentFixture<BlurProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlurProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlurProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
