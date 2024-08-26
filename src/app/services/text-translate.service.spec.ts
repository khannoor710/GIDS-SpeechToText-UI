import { TestBed } from '@angular/core/testing';

import { TextTranslateService } from './text-translate.service';

describe('TextTranslateService', () => {
  let service: TextTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
