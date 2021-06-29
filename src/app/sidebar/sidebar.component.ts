import { Component, OnInit } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  {
    path: "/products",
    title: "Business Products",
    icon: "nc-box-2",
    class: "",
  },
  {
    path: "/createproduct",
    title: "Combo Products",
    icon: "nc-box-2",
    class: "",
  },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
  { path: "/user", title: "Distributors", icon: "nc-single-02", class: "" },
  { path: "/table", title: "Reports", icon: "nc-chart-bar-32", class: "" },
];

export const USER_ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  { path: "/uploadDocs", title: "Uploads", icon: "nc-paper", class: "" },
  { path: "/combos", title: "Combos", icon: "nc-box-2", class: "" },
  { path: "/CPVC", title: "CPVC", icon: "nc-box-2", class: "" },
  { path: "/UPVC", title: "UPVC", icon: "nc-box-2", class: "" },
  { path: "/SWR", title: "SWR", icon: "nc-box-2", class: "" },
  { path: "/AGRI", title: "AGRI PIPES", icon: "nc-box-2", class: "" },
  { path: "/CASING", title: "CASING PIPES", icon: "nc-box-2", class: "" },
  { path: "/COLUMN", title: "COLUMN PIPES", icon: "nc-box-2", class: "" },
  { path: "/UGD", title: "UGD", icon: "nc-box-2", class: "" },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
];

export const STATEHEAD_ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  {
    path: "/samples",
    title: "Sample Products",
    icon: "nc-box-2",
    class: "",
  },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
  { path: "/targets", title: "Targets", icon: "nc-chart-bar-32", class: "" },
];

export const PlantLogin_ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
];
export const HO_ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
];
export const MD_ROUTES: RouteInfo[] = [
  { path: "/dashboard", title: "Dashboard", icon: "nc-layout-11", class: "" },
  { path: "/user", title: "Distributors", icon: "nc-single-02", class: "" },
  { path: "/orders", title: "Orders", icon: "nc-cart-simple", class: "" },
  { path: "/reports", title: "Reports", icon: "nc-chart-bar-32", class: "" },
];
export const HR_ROUTES: RouteInfo[] = [
  { path: "/employees", title: "Employees", icon: "nc-single-02", class: "" },
];
export const ACCOUNT_ROUTES: RouteInfo[] = [
  { path: "/user", title: "Distributors", icon: "nc-single-02", class: "" },
];
@Component({
  moduleId: module.id,
  selector: "sidebar-cmp",
  templateUrl: "sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  ngOnInit() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    if (a.data.userType == "Admin") {
      this.menuItems = ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "Dealer") {
      this.menuItems = USER_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "Distributor") {
      this.menuItems = USER_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "Statehead") {
      this.menuItems = STATEHEAD_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "PlantLogin") {
      this.menuItems = PlantLogin_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "HO") {
      this.menuItems = HO_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "ManagingDirector") {
      this.menuItems = MD_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "HR") {
      this.menuItems = HR_ROUTES.filter((menuItem) => menuItem);
    } else if (a.data.userType == "Accounts") {
      this.menuItems = ACCOUNT_ROUTES.filter((menuItem) => menuItem);
    }
  }
}
