import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ApiService} from "../../api/api.service";
import {Observable} from "rxjs";


export interface Market {
  id: string;
  name: string;
}

@Component({
  selector: 'm-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MarketsComponent implements OnInit {

  markets: Observable<Market[]>;
  tableColumns  :  string[] = ['id', 'name'];


  constructor(private apiService: ApiService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.markets = this.apiService.getMarkets();
  }

}
