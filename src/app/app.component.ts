import { Component, OnInit } from '@angular/core';
import { IRate } from './models/rates';
import { RatesService } from './services/rates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  rates: IRate[] = []
  loading = false

  constructor(private ratesService: RatesService) {}

  ngOnInit(): void {
    this.loading = true
    this.ratesService.getAll().subscribe(rates => {
      this.rates = rates.filter(rate => rate.cc === "USD" || rate.cc === "EUR")
      this.loading = false
    })
  }

}
