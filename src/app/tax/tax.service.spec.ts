import { TestBed } from '@angular/core/testing';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxService = TestBed.get(TaxService);
    expect(service).toBeTruthy();
  });

  it('should calculate tax free allowance', () => {
    const service: TaxService = TestBed.get(TaxService);

    expect(service.calculateTaxFreeAllowance(8000)).toEqual(1360);
    expect(service.calculateTaxFreeAllowance(10000)).toEqual(1026.048);
    expect(service.calculateTaxFreeAllowance(85528)).toEqual(525.12);
    expect(service.calculateTaxFreeAllowance(100000)).toEqual(341.875);
    expect(service.calculateTaxFreeAllowance(127000)).toEqual(0);
  });

  it('should calculate income and tax', () => {
    const service: TaxService = TestBed.get(TaxService);

    expect(service.calculate(8000)).toEqual({
      income: 8000,
      tax: 0
    });

    expect(service.calculate(20000)).toEqual({
      income: 17125,
      tax: 2875
    });

    expect(service.calculate(100000)).toEqual({
      income: 81171,
      tax: 18829
    });

    expect(service.calculate(200000)).toEqual({
      income: 148829,
      tax: 51171
    });
  });
});
