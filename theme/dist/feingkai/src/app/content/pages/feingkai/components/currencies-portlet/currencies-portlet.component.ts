import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Currencies} from "../../interfaces/currencies-interface";
import {ApiService} from "../../api/api.service";

@Component({
  selector: 'currencies-portlet',
  templateUrl: './currencies-portlet.component.html',
  styleUrls: ['./currencies-portlet.component.scss']
})
export class CurrenciesPortletComponent implements OnInit {

  public currencies:Currencies[];
  public errorMessage: Observable<never>;

  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    // Fetch Currencies from API
    this._apiService.getCurrencies()
        .subscribe(data => {
          this.currencies=data;
           
          if (Array.isArray(data)) {
            for (let currency of data) {
              currency["badgeBrand"]= (currency.type.toLowerCase() === "coin") ? "m-badge--brand": "m-badge--accent";
            }  
          }
        },
        error => {
          this.errorMessage = error;
          console.error("Loading currencies from API failed", error);
        });
  }

  /**
   * Opens the link specified in the 'data-link' attribute of the element
   * @param event click event
   */
  openLink(event: any) {
    var target = event.target || event.srcElement || event.currentTarget;
    let link: any = target.attributes['data-link'];
    if(link){
      window.open(link.value);
    }   
  }

}
