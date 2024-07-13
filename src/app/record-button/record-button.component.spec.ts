import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordButtonComponent } from './record-button.component';

describe('FileUploadComponent', () => {
  let component: RecordButtonComponent;
  let fixture: ComponentFixture<RecordButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecordButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});