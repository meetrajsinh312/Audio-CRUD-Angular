import { TestBed } from '@angular/core/testing';

import { AudioFileManagementService } from './audio-file-management.service';

describe('AudioFileManagementService', () => {
  let service: AudioFileManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioFileManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
