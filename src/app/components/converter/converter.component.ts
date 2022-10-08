import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IRate } from '../../models/rates';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html'
})
export class ConverterComponent implements OnInit{
  @Input() rates: IRate[]
  reactiveForm: FormGroup;
  currentRate: string
  private c1: IRate | undefined
  private c2: IRate | undefined
  private arr: IRate[]

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstCurrValue: new FormControl(null),
      secondCurrValue: new FormControl(null),
      firstCurrName: new FormControl("UAH"),
      secondCurrName: new FormControl("UAH")
    })
  }

  fillCurr(): void {
    this.arr = this.rates
    this.arr = [...this.arr, {"rate":1, cc:"UAH"}]
    this.c1 = this.arr.find(item => item.cc === this.reactiveForm.value.firstCurrName);
    this.c2 = this.arr.find(item => item.cc === this.reactiveForm.value.secondCurrName);

    if(this.c1 && this.c2) {
      this.currentRate = `1 ${this.c1.cc} = ${(1 * this.c1.rate / this.c2.rate).toFixed(4)} ${this.c2.cc}`;
    }
  }

  firstConvert(): void {
    if(this.c1 && this.c2) {
      const res = +(this.reactiveForm.value.firstCurrValue * this.c1.rate / this.c2.rate).toFixed(2);
      this.reactiveForm.patchValue({secondCurrValue: res})
    }
  }

  secondConvert(): void {
    if(this.c1 && this.c2) {
      const res = +(this.reactiveForm.value.secondCurrValue * this.c2.rate / this.c1.rate).toFixed(2);
      this.reactiveForm.patchValue({firstCurrValue: res})
    }
  }

  swap(): void {
    let firstTmp = this.reactiveForm.value.firstCurrName
    let secondTmp = this.reactiveForm.value.secondCurrName
    this.reactiveForm.patchValue({firstCurrName: secondTmp, secondCurrName: firstTmp})
    this.fillCurr()
    this.firstConvert()
  }

  reset(): void {
    this.reactiveForm.patchValue({firstCurrValue: null, secondCurrValue: null})
  }

}
