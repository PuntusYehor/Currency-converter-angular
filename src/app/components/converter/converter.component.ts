import { Component, Input } from '@angular/core';
import { IRate } from '../../models/rates';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html'
})
export class ConverterComponent {
  @Input() rates: IRate[]
  loading = false
  firstCurrNumber: number
  secondCurrNumber: number
  firstCurrString: string = "UAH"
  secondCurrString: string = "UAH"
  currentRate: string = ""

  convert(): void {
    let arr = this.rates

    arr = [...arr, {"rate":1, cc:"UAH"}]
    const c1 = arr.find(item => item.cc === this.firstCurrString);
    const c2 = arr.find(item => item.cc === this.secondCurrString);

    if(c1 && c2) {
      this.secondCurrNumber = +(this.firstCurrNumber * c1.rate / c2.rate).toFixed(2);
      this.currentRate = `1 ${c1.cc} = ${(1 * c1.rate / c2.rate).toFixed(4)} ${c2.cc}`;
    }
  }

  secondConvert() {
    let arr = this.rates

    arr = [...arr, {"rate":1, cc:"UAH"}]
    const c1 = arr.find(item => item.cc === this.firstCurrString);
    const c2 = arr.find(item => item.cc === this.secondCurrString);

    if(c1 && c2) {
      this.firstCurrNumber = +(this.secondCurrNumber * c2.rate / c1.rate).toFixed(2);
      this.currentRate = `1 ${c1.cc} = ${(1 * c1.rate / c2.rate).toFixed(4)} ${c2.cc}`;
    }
  }

  swap() {
    let tmp = this.firstCurrString
    this.firstCurrString = this.secondCurrString
    this.secondCurrString = tmp
    this.convert()
  }

}
