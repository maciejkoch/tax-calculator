import { Injectable } from '@angular/core';
import { TaxResult } from './tax.model';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  readonly LOWER_TAX = 0.17;
  readonly HIGHER_TAX = 0.32;
  readonly LOWER_TAX_LIMIT = 85528;

  constructor() { }

  calculate(salary: number): TaxResult {
    const salaryWithLowerTax = Math.min(this.LOWER_TAX_LIMIT, salary);
    const salaryWithHigherTax = salary - salaryWithLowerTax;
    const tax = salaryWithLowerTax * this.LOWER_TAX + salaryWithHigherTax * this.HIGHER_TAX;
    const taxFreeAllowance = this.calculateTaxFreeAllowance(salary);
    const finalTax = Math.max(tax - taxFreeAllowance, 0);

    return {
      income: Math.round(salary - finalTax),
      tax: Math.round(finalTax)
    };
  }

  calculateTaxFreeAllowance(salary: number): number {
    if (salary <= 8000) {
      return 1360;
    } else if (salary <= 13000) {
      return 1360 - 834.88 * (salary - 8000) / 5000;
    } else if (salary <= 85528) {
      return 525.12;
    } else if (salary <= 127000) {
      return 525.12 - 525.12 * (salary - 85528) / 41472;
    } else {
      return 0;
    }
  }
}
