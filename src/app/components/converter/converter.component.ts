import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRate } from '../../models/rates';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html'
})
export class ConverterComponent implements OnInit{
  @Input() rates: IRate[]
  loading = false
  reactiveForm: FormGroup;
  currentRate: string
  c1: IRate | undefined
  c2: IRate | undefined
  arr: IRate[]

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstCurrNumber: new FormControl(null),
      secondCurrNumber: new FormControl(null),
      firstCurrString: new FormControl("UAH"),
      secondCurrString: new FormControl("UAH")
    })
  }

  fillCurr(): void {
    this.arr = this.rates
    this.arr = [...this.arr, {"rate":1, cc:"UAH"}]
    this.c1 = this.arr.find(item => item.cc === this.reactiveForm.value.firstCurrString);
    this.c2 = this.arr.find(item => item.cc === this.reactiveForm.value.secondCurrString);
  }

  firstConvert(): void {
    if(this.c1 && this.c2) {
      const res = +(this.reactiveForm.value.firstCurrNumber * this.c1.rate / this.c2.rate).toFixed(2);
      this.reactiveForm.patchValue({secondCurrNumber: res})
      this.currentRate = `1 ${this.c1.cc} = ${(1 * this.c1.rate / this.c2.rate).toFixed(4)} ${this.c2.cc}`;
    }
  }

  secondConvert(): void {
    if(this.c1 && this.c2) {
      const res = +(this.reactiveForm.value.secondCurrNumber * this.c2.rate / this.c1.rate).toFixed(2);
      this.reactiveForm.patchValue({firstCurrNumber: res})
      this.currentRate = `1 ${this.c1.cc} = ${(1 * this.c1.rate / this.c2.rate).toFixed(4)} ${this.c2.cc}`;
    }
  }

  swap(): void {
    let firstTmp = this.reactiveForm.value.firstCurrString
    let secondTmp = this.reactiveForm.value.secondCurrString
    this.reactiveForm.patchValue({firstCurrString: secondTmp})
    this.reactiveForm.patchValue({secondCurrString: firstTmp})
    this.fillCurr()
    this.firstConvert()
  }

  reset(): void {
    this.reactiveForm.patchValue({firstCurrNumber: null})
    this.reactiveForm.patchValue({secondCurrNumber: null})
  }

}
