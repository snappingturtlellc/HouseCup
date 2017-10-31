import { TestBed, inject } from '@angular/core/testing';

import { FirebaseHelperService } from './firebase-helper.service';

describe('FirebaseHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseHelperService]
    });
  });

  it('should be created', inject([FirebaseHelperService], (service: FirebaseHelperService) => {
    expect(service).toBeTruthy();
  }));
});
