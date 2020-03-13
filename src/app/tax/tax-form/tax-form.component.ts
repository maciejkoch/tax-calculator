import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, map, share } from 'rxjs/operators';

import { TaxService } from '../tax.service';
import { TaxResult } from '../tax.model';

@Component({
  selector: 'app-tax-form',
  templateUrl: './tax-form.component.html',
  styleUrls: ['./tax-form.component.scss']
})
export class TaxFormComponent implements OnInit {

  salaryControl: FormControl;
  result$: Observable<TaxResult>;

  constructor(fb: FormBuilder, private taxService: TaxService) {
    this.salaryControl = fb.control('', Validators.required);
  }

  ngOnInit(): void {
    this.result$ = this.salaryControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(salary => this.taxService.calculate(salary)),
      share()
    );
  }

}
