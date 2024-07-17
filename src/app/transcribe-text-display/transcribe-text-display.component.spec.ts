import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscribeTextDisplayComponent } from './transcribe-text-display.component';

describe('TranscribeTextDisplayComponent', () => {
  let component: TranscribeTextDisplayComponent;
  let fixture: ComponentFixture<TranscribeTextDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranscribeTextDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranscribeTextDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
