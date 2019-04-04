import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeingkaiComponent} from "./feingkai.component";
import {FeingkaiAuthGuard} from "./auth/feingkai-auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    {
        path: '', // <= Page URL
        component: FeingkaiComponent, // <= Page component registration
        //canActivate: [FeingkaiAuthGuard],
    },
    {
        path: 'feingkai-login',
        component: LoginComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeingkaiRoutingModule { }
