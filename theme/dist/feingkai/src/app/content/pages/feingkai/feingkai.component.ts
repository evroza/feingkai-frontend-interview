import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ApiService} from "./api/api.service";
import {Router} from "@angular/router";


@Component({
  selector: 'm-feingkai-home',
  templateUrl: './feingkai.component.html',
  styleUrls: ['./feingkai.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FeingkaiComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    //Initiate the oauthservice just like above
    console.log("hello oauth");
    this.router.navigate(['feingkai', 'login']);
  }
}
