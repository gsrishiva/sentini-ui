import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { OrdersComponent } from "../../pages/orders/orders.component";
import { CreateproductComponent } from "../../pages/createproduct/createproduct.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ProductsComponent,
    CreateproductComponent,
    OrdersComponent,
  ],
})
export class AdminLayoutModule {}
