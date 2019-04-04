import { Component, OnInit } from '@angular/core';
import {FeingkaiAuthService} from "../auth/feingkai-auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login_url: string = 'https://auth-dev.feingkai.com/oauth/authorize?client_id=43565b8c4f73cd0e2e340275421d25cb1e2eb09b3c62788bc530607ddd670af7&redirect_uri=https://dev.feingkai.com/feingkai/login&response_type=code&scope=';

  constructor(private route: Router, private activatedRoute: ActivatedRoute, private auth: FeingkaiAuthService) {
    this.activatedRoute.queryParams.subscribe(params => {
      let code = params['code'];
      console.log(code); // Print the parameter to the console.
      this.auth.getJWT(code).subscribe(jwt => console.log("JWT", JSON.stringify(jwt)));
    });
  }

  ngOnInit() {
  }

  login(){
    console.log("login...");
  }
}
