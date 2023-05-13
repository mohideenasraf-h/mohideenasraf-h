import { TestBed } from '@angular/core/testing';

import {CommonUtilities} from '../js/common-utilities';

describe('CommonUtilities', () => {
  let service: CommonUtilities;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonUtilities);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
