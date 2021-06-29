import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Component({
  moduleId: module.id,
  selector: "maps-cmp",
  templateUrl: "orders.component.html",
})
export class OrdersComponent implements OnInit {
  orders: any = [];
  showDetails: boolean = false;
  showOrder: boolean = true;
  productsarr: any;
  oid: any;
  o_products: any = [];
  userInfo: any = JSON.parse(localStorage.getItem("currentUser"));
  approveButton: string;
  docket: any;
  //approveButton = "Approve";
  ifPlantLogin: Boolean;
  ifStatehead: Boolean;
  constructor(private _http: HttpClient) {}
  ngOnInit() {
    this.getOrders();
    if (this.userInfo.data.userType == "HO") {
      //this.approveButton = "Approve";
    }
    if (this.userInfo.data.userType == "PlantLogin") {
      this.ifPlantLogin = true;
    }
    if (this.userInfo.data.userType == "Statehead") {
      this.ifStatehead = true;
    }
  }
  user_Id: string;
  showinfo(value, id) {
    if (value == 1) {
      this.showOrder = false;
      this.showDetails = true;
      this.oid = id;
      this._http
        .get(`${environment.apiUrl}/cart/myOrders/By/${this.oid}`)
        .subscribe((result: any) => {
          this.o_products = result[0].products;
        });
    } else if (value == 0) {
      this.showOrder = true;
      this.showDetails = false;
    }
  }

  submitOrder() {
    let data = {
      order_id: this.oid,
      product: this.o_products,
      docket: this.docket,
    };
    this._http
      .post(`${environment.apiUrl}/products/updateSamples`, data)
      .subscribe((res) => {});
  }

  getOrders() {
    var a = JSON.parse(localStorage.getItem("currentUser"));
    var user_Id = a.data._id;
    var usertype = a.data.userType;
    if (usertype == "Admin") {
      this._http
        .get(`${environment.apiUrl}/cart/allOrders`)
        .subscribe((result: any) => {
          this.orders = result;
          //console.log(this.orders, "ifffffffffffffffffffffff");

          this.productsarr = this.orders[0].products;
        });
    } else {
      this._http
        .get(`${environment.apiUrl}/cart/myOrders/${user_Id}`)
        .subscribe((result: any) => {
          this.orders = result;
          //console.log(this.orders, "elseeeeeeeeeeeeeeeeeeeeeeeeeeeee");
          this.productsarr = this.orders[0].products;
        });
    }
    if (usertype == "PlantLogin") {
      this._http
        .get(`${environment.apiUrl}/cart/allOrders`)
        .subscribe((result: any) => {
          this.orders = result;
          console.log(this.orders, "iffffffffff");
          this.productsarr = this.orders[0].products;
        });
    }
  }

  approveSample(id) {
    var id = id;
    var data = {
      id: id,
      status: this.approveButton,
    };
    this._http
      .post(`${environment.apiUrl}/products/approveSampleOrder`, data)
      .subscribe((res) => {
        if (res[0].status) {
          this.approveButton = "Approved";
        }
        console.log("asdfa", res, "________", this.approveButton);
      });
  }
}
