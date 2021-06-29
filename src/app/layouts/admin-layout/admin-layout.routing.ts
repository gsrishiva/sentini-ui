import { Routes } from "@angular/router";
import { Role } from "../../models/role";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { OrdersComponent } from "../../pages/orders/orders.component";
import { CreateproductComponent } from "app/pages/createproduct/createproduct.component";
import { DealerproductsComponent } from "app/pages/dealerproducts/dealerproducts.component";
import { CartComponent } from "app/pages/cart/cart.component";
import { DocuploadComponent } from "app/pages/docupload/docupload.component";
import { UPVCComponent } from "app/pages/upvc/upvc.component";
import { AGRIComponent } from "app/pages/agri/agri.component";
import { CpvcComponent } from "app/pages/cpvc/cpvc.component";
import { AuthGuard } from "app/_helpers/auth.guard";
import { SwrComponent } from "app/pages/swr/swr.component";
import { CasingComponent } from "app/pages/casing/casing.component";
import { ColumnComponent } from "app/pages/column/column.component";
import { ViewdocsComponent } from "app/pages/viewdocs/viewdocs.component";
import { CombosComponent } from "app/pages/combos/combos.component";
import { SamplesComponent } from "app/pages/samples/samples.component";
import { ChangepwdComponent } from "app/pages/changepwd/changepwd.component";
import { UGDComponent } from "app/pages/ugd/ugd.component";
import { ReportsComponent } from "app/pages/reports/reports.component";
import { TargetsComponent } from "app/pages/targets/targets.component";
import { EmployeesComponent } from "app/pages/employees/employees.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Dealer, Role.Distributor, Role.Statehead] },
  },
  { path: "user", component: UserComponent },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  {
    path: "createproduct",
    component: CreateproductComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "samples",
    component: SamplesComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Statehead, Role.Admin] },
  },
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: [
        Role.Admin,
        Role.Statehead,
        Role.Dealer,
        Role.Distributor,
        Role.PlantLogin,
        Role.HO,
        Role.HR,
      ],
    },
  },
  { path: "dealerproducts", component: DealerproductsComponent },
  { path: "combos", component: CombosComponent },
  { path: "CPVC", component: CpvcComponent, canActivate: [AuthGuard] },
  { path: "UPVC", component: UPVCComponent, canActivate: [AuthGuard] },
  { path: "AGRI", component: AGRIComponent, canActivate: [AuthGuard] },
  { path: "SWR", component: SwrComponent, canActivate: [AuthGuard] },
  { path: "CASING", component: CasingComponent, canActivate: [AuthGuard] },
  { path: "COLUMN", component: ColumnComponent, canActivate: [AuthGuard] },
  { path: "UGD", component: UGDComponent, canActivate: [AuthGuard] },
  {
    path: "uploadDocs",
    component: DocuploadComponent,
    canActivate: [AuthGuard],
  },
  { path: "viewdocs", component: ViewdocsComponent, canActivate: [AuthGuard] },
  {
    path: "changepwd",
    component: ChangepwdComponent,
    canActivate: [AuthGuard],
  },
  { path: "reports", component: ReportsComponent, canActivate: [AuthGuard] },
  { path: "targets", component: TargetsComponent, canActivate: [AuthGuard] },
  {
    path: "employees",
    component: EmployeesComponent,
    canActivate: [AuthGuard],
  },
];
