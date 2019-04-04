import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

// import {FeingkaiRoutingModule} from './feingkai-routing.module';
import {FeingkaiComponent} from "./feingkai.component";
import {CurrenciesPortletComponent} from "./components/currencies-portlet/currencies-portlet.component";
import {MarketsComponent} from "./components/markets/markets.component";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {PortletModule} from "../../partials/content/general/portlet/portlet.module";
import {RouterModule} from "@angular/router";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MessengerModule} from "../../partials/layout/quick-sidebar/messenger/messenger.module";
import {ListTimelineModule} from "../../partials/layout/quick-sidebar/list-timeline/list-timeline.module";
import {CoreModule} from "../../../core/core.module";
import {SpinnerButtonModule} from "../../partials/content/general/spinner-button/spinner-button.module";
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule, MatTooltipModule
} from "@angular/material";
import {WidgetChartsModule} from "../../partials/content/widgets/charts/widget-charts.module";
import {LoginComponent} from "./login/login.component";

@NgModule({
    imports: [
        CommonModule,
        // FeingkaiRoutingModule,
        CommonModule,
        RouterModule,
        NgbModule,
        PerfectScrollbarModule,
        MessengerModule,
        ListTimelineModule,
        CoreModule,
        PortletModule,
        SpinnerButtonModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatProgressBarModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatTooltipModule,
        WidgetChartsModule,
    ],
    declarations: [
        FeingkaiComponent,
        CurrenciesPortletComponent,
        MarketsComponent,
        LoginComponent,
    ]
})
export class FeingkaiModule {
}
