import { TestBed } from '@angular/core/testing';

import { DownloadHmtlService } from './download-hmtl.service';

describe('DownloadHmtlService', () => {
  let service: DownloadHmtlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadHmtlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
