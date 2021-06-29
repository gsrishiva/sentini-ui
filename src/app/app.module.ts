import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastModule } from "primeng/toast";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterComponent } from "./components/register/register.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { DealerproductsComponent } from "./pages/dealerproducts/dealerproducts.component";
import { CartComponent } from "./pages/cart/cart.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { DocuploadComponent } from "./pages/docupload/docupload.component";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { UPVCComponent } from "./pages/upvc/upvc.component";
import { AGRIComponent } from "./pages/agri/agri.component";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { CpvcComponent } from "./pages/cpvc/cpvc.component";
import { SwrComponent } from "./pages/swr/swr.component";
import { ColumnComponent } from "./pages/column/column.component";
import { CasingComponent } from "./pages/casing/casing.component";
import { ViewdocsComponent } from "./pages/viewdocs/viewdocs.component";
import { TableModule } from "primeng/table";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { ProductcategoryPipe } from "./productcategory.pipe";
import { ToastrModule } from "ng6-toastr-notifications";
import { MessageService } from "primeng/api";
import { FileUploadModule } from "primeng/fileupload";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { CombosComponent } from "./pages/combos/combos.component";
import { SamplesComponent } from './pages/samples/samples.component';
import { ChangepwdComponent } from './pages/changepwd/changepwd.component';
import { UGDComponent } from './pages/ugd/ugd.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { TargetsComponent } from './pages/targets/targets.component';
import { EmployeesComponent } from './pages/employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    DealerproductsComponent,
    CartComponent,
    DocuploadComponent,
    UPVCComponent,
    AGRIComponent,
    CpvcComponent,
    SwrComponent,
    ColumnComponent,
    CasingComponent,
    ViewdocsComponent,
    ProductcategoryPipe,
    CombosComponent,
    SamplesComponent,
    ChangepwdComponent,
    UGDComponent,
    ReportsComponent,
    TargetsComponent,
    EmployeesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastModule,
    FooterModule,
    FixedPluginModule,
    OverlayPanelModule,
    ToastrModule.forRoot(),
    FileUploadModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
