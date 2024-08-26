import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextTranslationComponent } from './text-translation.component';

describe('TextTranslationComponent', () => {
  let component: TextTranslationComponent;
  let fixture: ComponentFixture<TextTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextTranslationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
