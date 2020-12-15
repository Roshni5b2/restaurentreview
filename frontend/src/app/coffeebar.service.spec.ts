import { TestBed } from '@angular/core/testing';

import { CoffeebarService } from './coffeebar.service';

describe('CoffeebarService', () => {
  let service: CoffeebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
